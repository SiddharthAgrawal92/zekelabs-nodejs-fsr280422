


//Client 1 --> http://localhost:8000
//.
//.
//.
//client 10K

//CPU has cores --> threads
//process_1 --> resource_1 --> waiting for resource_2 to get freed from process_2
//process_2 --> resource_2 --> waiting for resource_1 to get freed from process_2

//stateless
//request_1 --> to get 1-100 records
//request_2 --> next 100 records 101-200

//stateful
//request_1 --> to get 100 records --> [1..100]last fetched index=99
//request_2 --> to get 100 records --> 99+1...200

//CPU --> Company/Factory
//Company where we --> employees/worker 1...n

//Traditional web server
//Customer_1 -->  He wants to perform some Task_1 --> Task_1(Worker_1) --> Tell company that we have completed task --> Company will send this completed task back to the Customer_1
//Customer_2 -->  He wants to perform some Task_2 --> Task_2(Worker_2) -->
//.
//.
//n
//Customer_m --> Wait in the queue

//NodeJS
//Customer_1 -->  Event Loop will check if Operation is CPU intensive/blocking then Task_1 will be assinged to Worker_1(thread) else it processes the request and send response to the company --> Task_1(Worker_1), attaching an event that will be called when task is completed --> When task is completed worker_1 will tell the company that we have completed task --> Company will send this completed task back to the Customer_1
//Customer_2 -->  He wants to perform some Task_2 --> Task_2(Worker_1) -->
//.
//.
//n

//I/O blocking operation
//Asynchronous reading of a resource
//Timers
//Pending callabcks Call

//func(a, b){return a*b;}