import { LightningElement, api } from 'lwc';

export default class PaginationComp extends LightningElement {
    
    currentPage=1
     totalRecords
     @api recordSize=5
     totalPages=0
     visiableRecords    

        get records(){
            return this.visiableRecords
        }
   @api 
   set records(data){
    if(data){
        this.totalRecords= data
        this.recordSize=Number(this.recordSize)
        this.totalPages=Math.ceil(data.length/this.recordSize)
        
        this.updatedRecords()
    }
    }
     get disablePrevious(){
        return this.currentPage<=1
    }
     

    previousClickHandler(){
        if(this.currentPage>1){
            this.currentPage=this.currentPage-1
            this.updatedRecords()
        }
    }
    nextClickHandler(){
        if(this.currentPage < this.totalPages){
            this.currentPage=this.currentPage+1
            this.updatedRecords()
        }

    }
    
    updatedRecords(){
        const start=(this.currentPage-1)*this.recordSize
        const end = this.currentPage * this.recordSize
        this.visiableRecords=this.totalRecords.slice(start,end)

        this.dispatchEvent(new CustomEvent('update',{
            detail:{
                newrecords:this.visiableRecords
            }
        }))
    }

}