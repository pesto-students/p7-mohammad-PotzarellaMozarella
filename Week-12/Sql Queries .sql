/*Create tables IN WAREHOUSE*/
USE WAREHOUSE;


/*Find the item that has minimum weight*/
SELECT ITEMNO
FROM ITEMS
WHERE WEIGHT IN (SELECT min(WEIGHT) FROM ITEMS);


/*Find the different warehouses in “Pune”*/
SELECT WNAME
FROM WAREHOUSES 
WHERE CITY = "PUNE";


/*Find the details of items ordered by a customer “Mr. Patil”*/
SELECT * FROM ITEMS
WHERE ITEMNO IN 
(SELECT ITEMNO FROM ORDERS_ITEMS
WHERE ONO IN 
(SELECT ONO 
	FROM ORDERS
	WHERE CNO IN 
		(SELECT CNO 
		FROM CUSTOMER 
		WHERE CNAME ="Mr. Patil")));


/*Find a Warehouse which has maximum stores*/
SELECT WID,COUNT(SID) AS STORE_COUNT 
    FROM STORES 
    GROUP BY WID
    HAVING COUNT(SID)=
			(SELECT MAX(STORE_COUNT) FROM
				(SELECT WID,COUNT(SID) AS STORE_COUNT 
				FROM STORES GROUP BY WID)
			AS COUNTS);


/*Find an item which is ordered for a minimum number of times*/
SELECT ITEMNO,COUNT(ONO) AS ORDER_COUNT 
    FROM ORDERS_ITEMS 
    GROUP BY ITEMNO
    HAVING COUNT(ONO)=
		(SELECT MIN(ORDER_COUNT) FROM
			(SELECT ITEMNO,COUNT(ONO) AS ORDER_COUNT 
			FROM ORDERS_ITEMS GROUP BY ITEMNO)
        AS COUNTS);


/*Find the detailed orders given by each customer*/
SELECT OD.CNO, OD.CNAME, OD.ODATE, OD.ONO, I.ITEMNO, I.DESCR, I.WEIGHT, I.COST
FROM 
	(SELECT CO.CNO,CO.CNAME,CO.ODATE,CO.ONO,OI.ITEMNO
		FROM
			(SELECT O.CNO,O.ODATE,O.ONO,C.CNAME
			FROM ORDERS O
			INNER JOIN CUSTOMER C
			ON C.CNO=O.CNO)
		AS CO
		INNER JOIN ORDERS_ITEMS OI
		ON CO.ONO=OI.ONO)
AS OD
INNER JOIN ITEMS I
ON OD.ITEMNO=I.ITEMNO;


        
;










