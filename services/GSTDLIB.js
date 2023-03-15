class GSTDLIB{
    constructor(){
        this.date = new Date();
    }
    getTime(){
        return this.date.getHours() + ":" + this.date.getMinutes() + ":" + this.date.getSeconds();
    }
    getDate(){
        let m = this.date.getMonth() + 1;
        let d = this.date.getDate();

        if(m < 10){
            m = "0" + m;
            if(d < 10){
                d = "0" + d;
            }
        }else if(m>10 && d<10){
            d = "0" + d;
        }
        
        return m + "/" + d + "/" + this.date.getFullYear();
    }

    getNoOfDay(d1){
        let date1 = new Date(d1);
        let date2 = new Date();
        if(date1 === date2){
            return 0;
        }else if(date1 > date2){
            let diff = date1.getTime() - date2.getTime();
            return parseInt(diff/(1000*60*60*24));
        }
        else{
            let diff = date2.getTime() - date1.getTime();
            return parseInt(diff/(1000*60*60*24));
        }
    }
}

module.exports = GSTDLIB;