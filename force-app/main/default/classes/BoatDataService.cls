/**
 * @description       : Boat data service for boat search and update
 * @author            : Souvik Sen
 * @group             : 
 * @last modified on  : 07-31-2025
 * @last modified by  : Souvik Sen
**/
public with sharing class BoatDataService {

   /**
   * @description methods used to get the datails of boats from database
   * @author Souvik Sen | 07-31-2025 
   * @param boatTypeId 
   * @return List<Boat__c> 
   **/
   @AuraEnabled(cacheable=true)
   public static List<Boat__c>getBoats(string boatTypeId){
        String query = 'SELECT Id, Name, BoatType__c, BoatType__r.Name, Length__c, Price__c, Picture__c, Description__c, Contact__r.Name FROM Boat__c';

        if (String.isNotBlank(boatTypeId)) {
            query += ' WHERE BoatType__c = :boatTypeId';
        }
        return Database.query(query);
   }


   /**
   * @description  methods used to get the type of boats for the BoatTypePicklist on the BoatSearch page
   * @author Souvik Sen | 07-31-2025 
   * @return List<BoatType__c> 
   **/
   @AuraEnabled(cacheable=true)
   public static List<BoatType__c> getBoatTypes() {
       return [SELECT Id, Name FROM BoatType__c WITH SECURITY_ENFORCED ];
   }


   
   /**
   * @description methods used to get the similar Boats for the selected BoatType
   * @author Souvik Sen | 07-31-2025 
   * @param boatTypeId 
   * @return List<Boat__c> 
   **/
   @AuraEnabled(cacheable=true)
   public static List<Boat__c>getSimilarBoats(string boatTypeId){
    String query = 'SELECT Id, Name, BoatType__c, BoatType__r.Name, Length__c, Price__c, Picture__c, Contact__r.Name FROM Boat__c';

    if (String.isNotBlank(boatTypeId)) {
        query += ' WHERE BoatType__c = :boatTypeId';
    }
    return Database.query(query);
   }


      
   /**
   * @description used to update boats data from ShipAgency UI Page
   * @author Souvik Sen | 07-31-2025 
   * @param data 
   **/
   @AuraEnabled
   public static void updateBoatList(List<Boat__c>data){
    if (!Schema.sObjectType.Boat__c.isUpdateable()) {
       throw new System.SecurityException('User does not have update access to Boat__c');
   }
   List<Boat__c>boatsToUpdate = new List<Boat__c>();
   for(Boat__c boat: data){
       boatsToUpdate.add(boat);
   }
   update boatsToUpdate;
  }
  


   @AuraEnabled(cacheable=true)
   public static Boat__c updateBoat(Boat__c boat){
        if (!Schema.SObjectType.Boat__c.isUpdateable()) {
            throw new System.SecurityException('User does not have update access to Boat__c');
        }
        update boat;
        return boat;
   }

}