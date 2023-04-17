## Design subscription-based sports website which can display scores, game status, history for any games

### Requirement analysis (FR/NFR):
**Functional Requirements:**

- User authentication and subscription management
- Integration with third-party data providers to retrieve game data
- Real-time display of game scores and statuses
- Historical game data access
- Payment gateway integration

**Non-Functional Requirements:**

- High availability and scalability
- Low latency for real-time data
- Secure user authentication and payment processing
- Robust data storage and backup solutions
- Quick and reliable data retrieval

> Gather requirements and scope the problem.
> Ask questions to clarify use cases and constraints.
> Discuss assumptions.

### Capacity Estimation, constrains & assumptions
- The website will have an average of 100,000 page views per day, with a peak of 500,000 page views per day during major sports events.
- Each user session will last an average of 5 minutes.
- Assuming an average of 5 games per day per user, the system needs to handle 24.5 million game data requests per day.
- Assuming each game has an average of 10 data points (score, team information, etc.), we need to store approximately 245 million data points per day.
- Assuming that each data point is 10 KB.
- Total daily storage: 0.25 TB
(Total storage/day = data point size * Number of data points/day = 10KB * ~250 Million = 0.25 TB)
- 10 years of storage, we need 10 years * 365 days/year * 0.25 TB/day = 91.25 TB

### API Design:
- A subscription-based authentication system will be implemented to ensure only authorized users can access the website.
- The website API will support GET requests for game scores, statuses, and history.

To design a subscription-based sports website, we can create a database to store information about games, scores, and game statuses. We can use a relational database like MySQL or MS SQL Server, or a cloud relational database like Google Cloud SQL.

We can create four tables in the database: **a user table, a game table, a score table, and a game status table**.

The **user table (userID, subscriptionID, date, password)** will include tables for user authentication and subscription information.

The **game table (gameID, team1Name,  team2Name, date, time)** will store information about each game, including the teams playing and the date and time of the game. 

The **score table (scoreID, gameID, team1Score, team2Score)** will store information about the score for each game. 

The **game status (statusID, gameID, status)** table will store information about the game's status (e.g., in progress, completed or won/lost/draw, etc).

The operations in this website are **read-heavy**. The website should allow users to view current scores for matches, game status, and history for any games. To make the system scalable, we can use horizontal scaling, which allows the system to handle a large number of users and requests without experiencing downtime. We can cache frequently accessed content from the database in a memory cache.

We can also use a content delivery network (CDN) to reduce load and latency.

### Define Data Model:

- The data model will include information on games, teams, players, and scores.
- The data will be stored in a relational database with a normalized schema.
- The data model will also include tables for user authentication and subscription information.

To make the system highly available, we can use load balancers, multiple web servers spread out over multiple availability zones, and multiple MySQL instances in master-slave failover mode across multiple availability zones to improve redundancy. We can also separate out the web servers from the application servers and move static (and some dynamic) content to a CDN to reduce load and latency.

Finally, we can employ additional SQL scaling patterns, such as federation or sharding, to address the bottleneck with the SQL database.

### High Level Design

- The website will be designed to handle a large number of concurrent users.
- Load balancing and caching mechanisms will be implemented to ensure high availability and performance.
- Use **Horizontal Scaling** to handle increasing loads and to address single points of failure
- Add a **Load Balancer**
    - If you are configuring your own **Load Balancer**, setting up multiple servers in active-active or active-passive in multiple availability zones will improve availability
    - Use multiple Web Servers spread out over multiple availability zones
    - Use multiple **MySQL** instances in **Master-Slave Failover** mode across multiple availability zones to improve redundancy
- Move static (and some dynamic) content to a **Content Delivery Network (CDN)** to ensure fast and reliable content delivery to users across the globe. This will cache and distribute content to servers located closer to the user, reducing latency and improving overall performance.
- The following goals attempt to address the scaling issues with the  MySQL Database
    - Move the following data to a Memory Cache to reduce load and latency:
        - Frequently accessed content from MySQL
            - First, try to configure the **MySQL Database** cache to see if that is sufficient to relieve the bottleneck before implementing a **Memory Cache**
        - Session data from the **Web Servers**
            - The Web Servers  become stateless, allowing for  Autoscaling 
    - Reading 1 MB sequentially from memory takes about 250 microseconds, while reading from SSD takes 4x and from disk takes 80x longer.
    - Add  MySQL Read Replicas to reduce load on the write master.
        - Add **Load Balancers** in front of **MySQL Read Replicas**
        - Most services are read-heavy vs write-heavy
        
        We'll also want to address the bottleneck with the **SQL Database**.
        
        Although the **Memory Cache** should reduce the load on the database, it is unlikely the **SQL Read Replicas** alone would be enough to handle the cache misses. We'll probably need to employ additional SQL scaling patterns.
        
        The high volume of writes would overwhelm a single **SQL Write Master-Slave**, also pointing to a need for additional scaling techniques.
        
        - Federation
        - Sharding
