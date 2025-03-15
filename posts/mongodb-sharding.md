---
title: "MongoDB Sharding"
description: "MongoDB uses sharding to support deployments with very large data sets and high throughput operations."
date: "2021-02-30"
image: "/images/2_1_mongodb.jpeg"
tags: [ "Database","MongoDB"]
---

For starters, MongoDB is a document-oriented NoSQL database used for high volume data storage. In the traditional relational databases, we use tables and rows. In contrast, MongoDB makes use of collections and documents. Documents consist of key-value pairs which are the basic unit of data in MongoDB.

Without any further delay, we jump into what is Sharding, its requirement, sharding cluster architecture in MongoDB, and a practical example with Docker.

## Sharding

[Sharding](https://docs.mongodb.com/manual/reference/glossary/#term-sharding) is a method for distributing data across multiple machines. MongoDB uses sharding to support deployments with very large data sets and high throughput operations.

## Why Sharding?

Database systems with large data sets or high throughput applications can challenge the capacity of a single server. For example, high query rates can exhaust the CPU capacity of the server. Working set sizes larger than the system’s RAM stress the I/O capacity of disk drives.

For addressing system growth, we have 2 methods :

* Vertical Scaling.
* Horizontal Scaling.

## Vertical Scaling
Vertical scaling is increasing the capacity of a single server by using a more powerful CPU, adding more RAM, and increasing the amount of storage space. But there are practical limits to vertical scaling like the hardware limits and the load a single server can handle.

## Horizontal Scaling
Horizontal Scaling involves dividing the system dataset and load over multiple servers, adding additional servers to increase capacity as required. While the overall speed or capacity of a single machine may not be high, each machine handles a subset of the overall workload, potentially providing better efficiency than a single high-speed high-capacity server.

MongoDB supports *horizontal scaling* through sharding.

## Sharding cluster
Before going further, we need to understand the components in the sharding cluster.

 **Shard:** Each shard contains a subset of the sharded data. Each shard can be deployed as a [replica set](https://docs.mongodb.com/manual/reference/glossary/#term-replica-set) to provide redundancy and high availability. Together, the cluster’s shards hold the entire data set for the cluster.

**Mongos:** The mongos acts as a query router, providing an interface between client applications and the sharded cluster.

 **Config Servers:** Config servers store metadata and configuration settings for the cluster. They are also deployed as a replica set.

![Sharded Cluster](https://miro.medium.com/max/1240/1*DjZDfrie1kDFFdrQ1cy_Yw.png)

 ## Shard keys

 MongoDB uses the [shard key](https://docs.mongodb.com/manual/reference/glossary/#term-shard-key) to distribute the collection’s documents across shards. The shard key consists of a field or fields that exist in every document in the target collection.

You choose the shard key when sharding a collection. The choice of shard key cannot be changed after sharding. A sharded collection can have only one shard key.

To shard a non-empty collection, the collection must have an [index](https://docs.mongodb.com/manual/reference/glossary/#term-index) that starts with the shard key. For empty collections, MongoDB creates the index if the collection does not already have an appropriate index for the specified shard key. See [Shard Key Indexes](https://docs.mongodb.com/manual/core/sharding-shard-key/#sharding-shard-key-indexes).

*Note: The choice of shard key affects the performance, efficiency, and scalability of a sharded cluster. A cluster with the best possible hardware and infrastructure can be bottlenecked by the choice of the shard key.*

## Chunks
MongoDB partitions sharded data into chunks. Each chunk has an inclusive lower and exclusive upper range based on the shard key. MongoDB migrates chunks across the shards in the sharded cluster using the sharded cluster balancer. The balancer attempts to achieve an even balance of chunks across all shards in the cluster.

## Balancer and Even Chunk Distribution
In an attempt to achieve an even distribution of chunks across all shards in the cluster, a balancer runs in the background to migrate chunks across the shards

## Advantages of Sharding
* Reads/Writes: MongoDB distributes the read and write workload across the shards in the sharded cluster, allowing each shard to process a subset of cluster operations. Both read and write workloads can be scaled horizontally across the cluster by adding more shards.
* Storage Capacity: Sharding distributes data across the shards in the cluster, allowing each shard to contain a subset of the total cluster data. As the data set grows, additional shards increase the storage capacity of the cluster.
* High Availability: A sharded cluster can continue to perform partial read/write operations even if one or more shards are unavailable. While the subset of data on the unavailable shards cannot be accessed during the downtime, reads or writes directed at the available shards can still succeed.

*In production environments, individual shards should be deployed as replica sets, providing increased redundancy and availability.*

## Sharded and Non-Sharded Collections
A database can have a mixture of sharded and unsharded collections. Sharded collections are partitioned and distributed across the shards in the cluster. Unsharded collections are stored on a primary shard. Each database has its own primary shard.

![](/images/2_3_mongodb.png)

## Connecting to a Sharded Cluster
You must connect to a mongos router to interact with any collection in the sharded cluster. This includes sharded and unsharded collections. Clients should never connect to a single shard in order to perform read or write operations.

![](/images/2_4_mongodb.png)

You can connect to a [mongos](https://docs.mongodb.com/manual/reference/program/mongos/#bin.mongos) the same way you connect to a mongod, such as via the mongo shell or a MongoDB driver.
You can find the docker-compose.yaml and same set up without docker [here](https://github.com/pranaykumargoud/mongodb-sharding).

Github link: [MongoDB sharding](https://github.com/pranaykumargoud/mongodb-sharding)

 

## References and additional resources:

* [Sharding shard key](https://docs.mongodb.com/manual/core/sharding-shard-key/)
* [Mongo Best Practices](https://www.mongodb.com/lp/white-paper/usage/ops-best-practices)
* [Sharing methods](https://www.mongodb.com/presentations/webinar-sharding-methods-mongodb?jmp=docs)
