---
title: "CAP Theorem"
description: "CAP theorem states that any distributed system with a state can have..."
date: "2021-02-01"
image: "/images/4_cap_theorem.png"
tags: [ "Distributed Systems"]
---

CAP theorem is a fundamental theorem in distributed systems.  It states that a distributed data store or any distributed system with a state can have at most two of the following three properties. 

* Consistency
* Availability
* Partition Tolerance


A lot of terms. But the definition mentioned above is not complete. 
Let’s break it down and understand step by step. 


## Distributed Systems


A distributed system contains multiple nodes which are physically separate but linked together by the network.  All nodes communicate with each other and together form a distributed system. 

A single node cannot be called a distributed system. It has to be definitely more than one node. 


Now let’s go over what it is meant by the system to be consistent, available, and partition tolerant. 


## Consistency


Every read must receive the most recent write or an error.  It means every read operation that begins after a write must receive that write value. 


If not, it is said to be an inconsistent system.  

Let’s assume there are two servers S1, S2, and Client C. Initially S1 and S2 have values v0 with them. Now, the Client sends a write request with value v1 to S1.  

The S1 sends out an acknowledgment to the client only after all nodes are updated. 

After that client sends a read request to S2. If the value returned by S2 is v1, the distributed system is consistent. As all the nodes are updated with the most recent write.

This is the expected functionality of a consistent system. 



In case of an inconsistent system, the server S1 sends out the acknowledgment after it is updated and the client may not receive the most recent write when it queries S2. 



## Availability


Every non-failing node returns a response for all read and write requests in a reasonable amount of time without the guarantee that it contains the most recent write. 


Here, the server is not allowed to ignore the requests. If it is not crashed, it must eventually respond to the client. 


## Partition Tolerance


The system continues to operate despite an arbitrary number of messages being dropped by the network between nodes.  

It means our system should function correctly despite the network partitions.  

## What is a network partition?  

Below pictures without and with partition answers that. 

![Network Partition](/images/4_cap_network.png)

Note: The consistency in ACID Properties represents a different concept than the consistency in the CAP theorem.


## Understanding the CAP Theorem

The CAP Theorem states that in a distributed system, it's impossible to simultaneously achieve all three of the following guarantees:

- **Consistency:** Every read receives the most recent write or an error.
- **Availability:** Every request receives a response, without guarantee of the freshness of the data.
- **Partition Tolerance:** The system continues to operate despite network partitions.

### Implications of the CAP Theorem

#### Scenario: Choosing Availability over Consistency

When choosing availability over consistency in the presence of a network partition:
- The system processes requests and returns the most recent write, but cannot guarantee it's the latest due to the partition.
- For example, with servers S1 and S2 and a client C, if S1 acknowledges a write (v1) before replicating to S2, and a partition occurs, S1 and S2 end up with inconsistent values (v1 in S1, v0 in S2).

#### Scenario: Choosing Consistency over Availability

When opting for consistency over availability:
- The system may return errors or timeouts as it cannot guarantee up-to-date information during partitions.
- Nodes need time to update information and may not be available for immediate responses.

### Gilbert and Lynch's Proof

Gilbert and Lynch demonstrated that a distributed system cannot achieve all three properties simultaneously:
- Assume servers S1 and S2 with value v0, and a partition occurs.
- Client sends a write (v1) to S1. As the system is available, S1 responds, but cannot replicate to S2 due to partition.
- S1 updates to v1 while S2 remains at v0, leading to inconsistency when S2 responds to a read request with v0, contradicting the earlier write to S1 (v1).

Thus, Gilbert and Lynch's proof underscores that any system claiming to be consistent, available, and partition-tolerant ultimately fails to maintain consistency during network partitions.

## Resources

- [CAP Theorem - Wikipedia](https://en.wikipedia.org/wiki/CAP_theorem)  
- [Understanding the CAP Theorem - DZone](https://dzone.com/articles/understanding-the-cap-theorem)  
- [An Illustrated Proof of the CAP Theorem](https://mwhittaker.github.io/blog/an_illustrated_proof_of_the_cap_theorem/)  
- [CAP Theorem and Distributed Database Management Systems - Towards Data Science](https://towardsdatascience.com/cap-theorem-and-distributed-database-management-systems-5c2be977950e)  