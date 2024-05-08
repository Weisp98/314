package com.example;

import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoClient;
import com.mongodb.ConnectionString;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import org.bson.Document;
import java.util.List;
import java.util.ArrayList;
import com.mongodb.client.model.Filters;
import com.mongodb.client.model.Updates;



public class ViewPropertyController {
    public List<Document> viewProperty(String username) {
        User user = new User();
        return user.getListings(username);
    }
}



// public class ViewPropertyController {
//     private MongoCollection<Document> collection;

//     public ViewPropertyController() {
//         ConnectionString connectionString = new ConnectionString("mongodb://localhost:27017");
//         MongoClient mongoClient = MongoClients.create(connectionString);
//         MongoDatabase database = mongoClient.getDatabase("314_db");
//         this.collection = database.getCollection("users");
//     }

//     public List<Document> execute(String username) {
//         Document user = collection.find(new Document("username", username)).first();
//         if (user != null) {
//             return (List<Document>) user.get("listings");
//         }
//         return new ArrayList<>();
//     }
// }