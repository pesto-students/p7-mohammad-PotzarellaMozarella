## Design Twitter application
○ User should be able to tweet
○ Timeline -> Home timeline , User timeline, Search timeline
○ User should also be able to see trending hashtags and topics

### Requirement analysis (FR/NFR):
**Functional requirements:**

The functional requirements are as follows:

- Post Tweets: Users should be able to create and post tweets, which may include text, photos, or links.
- Read Tweets
- User timeline: Displaying user’s tweets and tweets user retweet
- Home timeline: Displaying Tweets from people user follow
- Search timeline: Display search results based on #tags or search keyword
- The user should see trends

**Non-Functional requirements:**

The non-functional requirements are as follows:

- High Availability: The service should be highly available, meaning it should be able to handle a large number of users and requests without experiencing downtime.
- Low latency
- Eventual consistency: It’s completely ok if a user sees the tweet of his follower a bit delayed

### Capacity Estimation, constrains & assumptions
**Traffic**: 

- Twitter now has 300M worldwide daily active users
- Tweets/second on an average: 6,000 tweets
- Queries/second to get the timelines:  6,00,000  qps
- Tweets delivered on fanout per second: 60,000
- Searches per second: 4,000
- Avg follower/user: 200*

*some users like some celebrities have millions of followers

**Storage**:

- Assuming that each tweet is 10 KB
    - `tweet_id` - 8 bytes
    - `user_id` - 32 bytes
    - `media` - 10 KB average
- Total daily storage: 5 TB
(Total storage/day = Tweet size * Number of tweets/day = 10KB * ~50 Million = 5 TB)
- 10 years of storage, we need 10 years * 365 days/year * 5 TB/day = 18.5 PB

**Timeline**:

- Viewing the timeline should be fast
- Twitter is more read heavy than write heavy
    - Optimize for fast reads of tweets
- Ingesting tweets is write heavy

**Search**

- Searching should be fast
- Search is read-heavy

### API Design:
The basic requirement for the platform would be a database. One can go for relational databases like MySQL, MS SQL Server, or cloud relational databases like Google Cloud SQL, etc. 

The operations in Twitter are **read-heavy**. So, the system we design should allow the user to go through the tweets efficiently. To make the system scalable, we would be using **horizontal scaling** as they are more resilient and scale well as the users increase. We can create three tables in the database: user table, tweet table, and followers table.

**User table (userID, userName):** It will store the information about the user like the userID and the userName. Here the primary key can be the userId attribute. The user's information is stored when a user creates a profile on Twitter.

**Tweet table (tweetID, content, userID, date):** It will store the tweet's id, the tweet's content, user id, and date tweeted. Here the primary key can be the tweetId attribute. When a user tweets, the tweet gets stored in the tweet Table along with the userID and they will have a one-to-many relationship with the user table.

**Followers table**: When a user follows another user on Twitter, it gets stored in the followers table. Caching is done here to avoid redoing the same operations and save time. It also has a one-to-many relationship with the user table.
To make the system highly available, we can use load balancers, multiple web servers spread out over multiple availability zones, and multiple MySQL instances in master-slave failover mode across multiple availability zones to improve redundancy. We can also separate out the web servers from the application servers and move static (and some dynamic) content to a CDN to reduce load and latency.

Finally, we can employ additional SQL scaling patterns, such as federation or sharding, to address the bottleneck with the SQL database.

### Define Data Model:
When deciding on a data storage solution for a large platform with many users, it is important to consider both SQL and NoSQL options. However, due to scalability issues with SQL solutions, we can use a combination of both. A NoSQL solution with a wide column data store like Cassandra to store data such as tweets, comments, and likes.

For entities like users and their followers, we may consider using a graph-based data store solution. By using the appropriate data store for each type of data, we can ensure that the system is able to handle a large volume of data and scale effectively.

### High Level Design
![HLD](HLD.png)
- Use **Horizontal Scaling** to handle increasing loads and to address single points of failure
    - Add a **Load Balancer**
        - If you are configuring your own **Load Balancer**, setting up multiple servers in active-active or active-passive in multiple availability zones will improve availability
        - Use multiple **Web Servers** spread out over multiple availability zones
        - Use multiple **MySQL** instances in **Master-Slave Failover** mode across multiple availability zones to improve redundancy
- Separate out the **Web Servers** from the **Application Servers**
    - Scale and configure both layers independently
    - **Web Servers** can run as a **Reverse Proxy**
    - For example, you can add **Application Servers** handling **Read APIs** while others handle **Write APIs**
    - Add more **Web Servers** and **Application Servers** to improve responsiveness
- Move static (and some dynamic) content to a **Content Delivery Network (CDN)** to reduce load and latency
- The following goals attempt to address the scaling issues with the **MySQL Database**
    - Move the following data to a **Memory Cache** such as Elasticache to reduce load and latency:
        - Frequently accessed content from **MySQL**
            - First, try to configure the **MySQL Database** cache to see if that is sufficient to relieve the bottleneck before implementing a **Memory Cache**
        - Session data from the **Web Servers**
            - The **Web Servers** become stateless, allowing for **Autoscaling**
    - Reading 1 MB sequentially from memory takes about 250 microseconds, while reading from SSD takes 4x and from disk takes 80x longer.
    - Add **MySQL Read Replicas** to reduce load on the write master.
        - Add **Load Balancers** in front of **MySQL Read Replicas**
        - Most services are read-heavy vs write-heavy

The **Fanout Service** is a potential bottleneck. Twitter users with millions of followers could take several minutes to have their tweets go through the fanout process. This could lead to race conditions with replies to the tweet, which we could mitigate by re-ordering the tweets at serve time.

We could also avoid fanning out tweets from highly-followed users. Instead, we could search to find tweets for highly-followed users, merge the search results with the user's home timeline results, then re-order the tweets at serve time.

Additional optimizations include:

- Keep only several hundred tweets for each home timeline in the **Memory Cache**
- Keep only active users' home timeline info in the **Memory Cache**
    - If a user was not previously active in the past 30 days, we could rebuild the timeline from the **SQL Database**
        - Query the **User Graph Service** to determine who the user is following
        - Get the tweets from the **SQL Database** and add them to the **Memory Cache**
- Store only a month of tweets in the **Tweet Info Service**
- Store only active users in the **User Info Service**
- The **Search Cluster** would likely need to keep the tweets in memory to keep latency low

We'll also want to address the bottleneck with the **SQL Database**.

Although the **Memory Cache** should reduce the load on the database, it is unlikely the **SQL Read Replicas** alone would be enough to handle the cache misses. We'll probably need to employ additional SQL scaling patterns.

The high volume of writes would overwhelm a single **SQL Write Master-Slave**, also pointing to a need for additional scaling techniques.
        - Federation
        - Sharding
