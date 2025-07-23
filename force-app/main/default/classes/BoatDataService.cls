/**
 * @description       : 
 * @author            : Souvik Sen
 * @group             : 
 * @last modified on  : 07-23-2025
 * @last modified by  : Souvik Sen
**/
public with sharing class BoatDataService {

   @AuraEnabled(cacheable=true)
   public static List<Boat__c>getBoats(){
        return [SELECT Id, Name, BoatType__c, BoatType__r.Name, Length__c, Price__c,
                       Picture__c, Contact__r.Name
                 FROM Boat__c 
                 WITH SECURITY_ENFORCED];
   }

   @AuraEnabled(cacheable=true)
   public static List<BoatType__c> getBoatTypes() {
       return [SELECT Id, Name FROM BoatType__c WITH SECURITY_ENFORCED ];
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