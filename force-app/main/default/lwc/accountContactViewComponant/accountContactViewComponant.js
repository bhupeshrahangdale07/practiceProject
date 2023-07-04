import { LightningElement, track,wire } from 'lwc';
import getAccResults from '@salesforce/apex/GetAccounts.getAccResults';
import fetchAccountRecords from '@salesforce/apex/GetAccounts.fetchAccountRecords';
import { NavigationMixin } from 'lightning/navigation';
import { encodeDefaultFieldValues } from 'lightning/pageReferenceUtils';
const columns = [
    { label: 'Account name', fieldName: 'Name' },
    { label: 'Type', fieldName: 'Type' },
    { label: 'Country', fieldName: 'BillingCountry' },
    { label: 'Industry', fieldName: 'Industry' },
    {label: 'Website', fieldName: 'Website',type: 'url'},
    { label: 'Actions', type:'button', typeAttributes:{
        label:'Create New Contact',
        name:'Create New Contact',
        title:'Create New Contact',
        value:'Create_Contact',
        
     }},
   
];

export default class AccountContactViewComponant extends NavigationMixin(LightningElement) {
   

    InputAccountName;
   
    data;
    columns= columns;
    error;
    inputCountry;
    Account_Id;
    defaultSortDirection = 'asc';
    sortDirection = 'asc';
    sortedBy;
    visibleRecords;
    @track inputIndustries=[];
  
    onChangeHandler(event){
    this.InputAccountName=event.target.value;
   // console.log('Account Name '+this.InputAccountName);
   }

   @wire(fetchAccountRecords, {accName : '$InputAccountName'})
   wireAcconts({error,data}){
    if(data){
        this.data=data;
    }
    else if(error){
        this.error=error;
    }
   }


   get countries(){
    return [
        {label: 'India' , value: 'India'},
        {label: 'France' , value: 'France'},
        {label: 'Australia' , value: 'Australia'},
        {label: 'Brazil' , value: 'Brazil'},
        {label: 'China' , value: 'China'},
        {label: 'Finland' , value: 'Finland'},
        {label: 'Germany' , value: 'Germany'},
        {label: 'Iran' , value: 'Iran'},
        {label: 'Italy' , value: 'Italy'},
        {label: 'Japan' , value: 'Japan'},
        {label: 'Nepal' , value: 'Nepal'},
        {label: 'Russia' , value: 'Russia'},
        {label: 'South Africa' , value: 'South Africa'}
    ]
   }
   selectCountryHandler(event){
    this.inputCountry=event.detail.value;
   }

    get options() {
        return [
            { label: 'Agriculture', value: 'Agriculture' },
            { label: 'Apparel', value: 'Apparel' },
            { label: 'Banking', value: 'Banking' },
            { label: 'Biotechnology', value: 'Biotechnology' },
            { label: 'Chemicals', value: 'Chemicals' },
            { label: 'Communications', value: 'Communications' },
            { label: 'Construction', value: 'Construction' },
            { label: 'Consulting', value: 'Consulting' },
            { label: 'Education', value: 'Education' },
            { label: 'Electronics', value: 'Electronics' },
            { label: 'Energy', value: 'Energy' },
            { label: 'Engineering', value: 'Engineering' },
            { label: 'Entertainment', value: 'Entertainment' },
            { label: 'Environmental', value: 'Environmental' },
            { label: 'Finance', value: 'Finance' },
            { label: 'Food & Beverage', value: 'Food & Beverage' },
            { label: 'Government', value: 'Government' },
            { label: 'Healthcare', value: 'Healthcare' },
            { label: 'Hospitality', value: 'Hospitality' },
        ];
    }


    handleOnChange(event) {
        this.inputIndustries = event.detail.value;
        console.log('Selected Values '+this.inputIndustries);
    }

    searchHandler(){
        getAccResults({country : this.inputCountry , industries : this.inputIndustries }).then((result)=>{
            this.data=result;
        }).catch((error)=>{
            this.error=error;
        })
    }
    onRowActionHandler(event){
        if(event.detail.action.value=='Create_Contact'){
            this.Account_Id=event.detail.row.Id;
            console.log('Account Is is '+ this.Account_Id);

                const defaultValues = encodeDefaultFieldValues({
                    AccountId: this.Account_Id
                 });
          
                 this[NavigationMixin.Navigate]({
                     type: 'standard__objectPage',
                     attributes: {
                         objectApiName: 'Contact',
                         actionName: 'new'
                     },
                    state: {
                         defaultFieldValues: defaultValues
                     }
                 });
             
        }
    }
    onupdateHandler(event){
        this.visibleRecords=event.detail.newrecords
        console.log('all visiable records :-'+ this.visibleRecords);
        }
        

    
}