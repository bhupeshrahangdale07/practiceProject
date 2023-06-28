public with sharing class GetAccounts {
    public GetAccounts() {

    }
    @AuraEnabled
    public static List<Account> getAccResults(String country, List<String> industries) {
        List<Account> AccountList = new List<Account>();

        if(industries == null)
            industries = new List<String>();

        
            String query = 'Select Id,Name,Type,Industry,BillingCountry,Website FROM Account WHERE BillingCountry = ' + '\''+country +'\''+ ' OR Industry IN: industries';
            system.debug(query);
            List<Account> accList = Database.Query(query);
            system.debug('List '+accList);
          
        return accList;
    }

@AuraEnabled(cacheable=true)
public static List<Account> fetchAccountRecords(String accName){
    try {
        if(!string.isEmpty(accName)){
      string  searchKey= '%'+accName+'%';
       return [Select Id,Name,Type,Industry,BillingCountry,Website From Account Where Name LIKE :searchKey];
    }else {
        return new List<Account>();
    }
    } catch (Exception e) {
        throw new AuraHandledException(e.getMessage());
        
    }
}
}