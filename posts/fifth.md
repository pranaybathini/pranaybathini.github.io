---
title: "Distributed Systems Glossary"
description: "A distributed system contains multiple nodes which are physically separate but linked  together by the network."
date: "2021-02-08"
image: "https://www.splunk.com/content/dam/splunk2/images/data-insider/what-are-distributed-systems/distributed-systems-diagram.svg"
tags: ["Distributed Systems"]

---

## Distributed System ✨


A distributed system contains multiple nodes which are physically separate but linked  together by the network.  All nodes communicate with each other and  working together form a distributed system and appear as one system to the end user. 

Examples - Banking system, E-commerce sites, Online Multiplayer games.

## Scalability

Scalability is the capability of a system to handle growing demand and manage the requests by adding more resources. 

 In simple terms, Initially a system is able to support 10,000 users. Suddenly, it got hit over night and more users start coming. More users means more requests. After a time, there will be more requests than a system can handle. By adding more resources, we can up scale the system. We can also down-scale when load is reduced. This capability of the distributed systems is called Scalability. 


There are 2 types of scaling, Horizontal scaling and Vertical Scaling. 


* Horizontal Scaling   -   This means you can add more servers to your existing pool of servers (Existing resources) to handle more load. 

Example for horizontal scaling - Mongodb

* Vertical Scaling   -  This means adding more resource(RAM, CPU, Storage etc) to your existing server. This comes with a limit on the server. After certain threshold you can’t add more resource. For example, if a server has 1 CPU, 2 GB RAM.  We can scale vertically by increasing existing limits to 2CPU, 6GB RAM. But this comes with a downtime as we are upgrading existing servers unlike horizontal scaling where we are adding extra servers. 

Example for vertical scaling - MySQL


## Reliability


A distributed system is said to be reliable if it keeps delivering its services even after one or more of its components fails. It is also defined as the probability of a system performing its functions without failure for a given period. 


In simple terms, it means even if a node is down, some other backup node takes its place and continues to do the work it supposed to do.  It is achieved by removing every single point of failure and can be achieved through redundant components and data. 


## Availability


Availability is the time the system will remain operational to perform what is intended to do under normal conditions. 

Let us take an example to calculate the availability. Suppose you have a server and at the end of year you have calculated the total down time.

```text
Total down time - 20 days

Total days in an year - 365 days 

Total number of days, system is available - 345 days

Availability = (345 / 365 ) * 100 = 94.52%
```


Let’s see how you can increase the availability. Let’s take the above example. For simple calculations, let’s round up the availability. It is 95% for one server.

One day = 24 hrs = 1440 minutes. 

So, there is 5%( 72 minutes) chance every day that the system might be down. What if we have four of same servers with 95% uptime. 
The probability of all four being down is (0.05)^4 = 0.00000625 

So the probability of at least one server being up is 1 - 0.00000625  = 0.99999375 

See, the magic of removing single point of failure. In reality there are many other factors also involved. For simpler understanding, let’s ignore them all for now. 

A reliable system is available but an available system is not necessarily reliable. 


## Concurrency


Concurrency is a property of a system representing that multiple clients can have can access the same resource at the same time.  In other words, we can multiple executions of the same activity at the same time. Also, these activities can have interactions among them. The concurrent actions may take place in different components of a distributed system. 


Hence, it is also required to have good concurrency control mechanism too. For example, two people trying to book the same ticket. If there is no concurrency control, both of them end up having the same seat which is not the desired outcome. 


Also, concurrency reduces latency and increases throughput of the whole system.

## Efficiency


An efficient system has all the best things as cheaply as possible like low latency(Faster response time),  top quality high throughput. 


Efficiency is mostly measured by two measures - latency and throughput.

### Latency 

The delay to obtain the first item or the first piece of data. ( The lower the better)

### Throughput 

The number of items or the amount of data delivered per unit time, usually per second.  (The higher the better) 


## Serviceability 


Serviceability refers to how fastly and the ease of the system to recover from failures and how efficiently and effectively the system can be kept running. In other words, how easily we can prevent or recover the system from failures. 


## Manageability

Manageability refers to the ease with which we can operate, diagnose and maintain the system.


In other words, It refers to the ease with which the system can be monitored and maintained to keep it performing, secure, and running smoothly and it is more focussed on the system administrators than users. 


## Fault Tolerance


Fault tolerance is the ability of the system to continue functioning without interruption when one or more components fail. 


In distributed systems, anything can fail at any time. Fault tolerant systems have backup components to ensure availability all the time and no loss of service. 


## Resource sharing

Resource sharing means all the existing resources can be accessed directly or remotely by all the nodes in the distributed system. 

The resources can be hardware resources like disks, printers etc to cut down costs  and software resources like db objects, files for consistency and exchange of information. 

Generally, all resources are managed by a software module known as Resource manager. It involves, resource discovery and resource scheduling.


## Heterogeneity

In a distributed system, systems has variety in network, computer hardware, operating systems, programming languages and implementations by different developers.  

Hence, Heterogeneity is a characteristic in a distributed systems.


## Openness

Distributed systems must be open in terms of hardware and software.  Openness is related to extensions and improvements  in a distributed system.

It is achieved by 

* A detailed and well defined interface of the components to be published.
* New systems can be easily integrated with existing components. 
* There should be a uniform communication mechanism and a published interface for accessing shared resources.


## Transparency

System users should perceive the distributed systems as a single system rather than collection of systems. For example, you might have you amazon app. There are many systems running together but for users, it is perceived as single system. This characteristics is called transparency. 


It  has many different forms like location, concurrency, relocation, replication, persistence and failure transparency.  Basically, all these communications will be hidden from users. It makes things simple. 

