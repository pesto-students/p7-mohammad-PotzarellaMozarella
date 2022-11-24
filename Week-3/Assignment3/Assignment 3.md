# Assignment 3
## _Output_

Count is 0


## Why?
The function *createIncrement()* is called once at  ```const [increment, log] = createIncrement();```
and the count is set to 0 and the message is set to 'Count is 0'.
Next when the *increment()* function is called thrice, the value of count is incremented but the message isn't changed as it lies outside the *increment()* function. 
When the *log()* function is called it prints the initially set message which has not changed- 
#### Count is 0
