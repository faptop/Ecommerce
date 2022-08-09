// 1. here we are making api filter which will filter(search) products for us
//  ex: http://localhost:3000/product?keyword=redmi11
    //   so here querystr=>keyword=redmi and query => Product.find()
// ----------------------------------------------------------------------------
// why we use (this.) variable in java
//  refer video=https://www.youtube.com/watch?v=W7f2vYcVhg0&list=PLUgerUNP6Fl3qdjtD_lNEXZcvQTaAb-8z&index=2&t=458s
// ------------------------------------------------------------------------
//creating class
class Apifeatures{
    // for java refer to https://www.youtube.com/watch?v=P6As9evOSvI
    //creating constructor
    constructor(q,qs){
        // query is an instance variable 
        this.query=q;
        this.querystr=qs;
    }
    // making search feature(making a method/function)
    search(){
        //terenary operator 
        const keyword=this.querystr.keyword?{
            // call when we get keyword
            name:{ /* we are doing this for perfect string matching */
                // regex provide regular expression capabilities for pattern matching strings in queries
                $regex: this.querystr.keyword,
                // case insensitive
                $options:"i" 
            },
        }:{/* this one is called when keyword not found */};
        console.log(keyword);
        /* here this.query=Product.find()
         ex here this.query=this.query.find(laptop) */
        this.query=this.query.find({...keyword});
        // here this contains Product.find(laptop)
        return this;
        // returning this means we are returning (query and this.querystr)
    }
    // _____________________________________________________________________

    filter(){
        // in querystr we have {keyword,page,limit,price[lt],price[gt],category}
        const querycopy={...this.querystr};
        console.log(querycopy);
        const removefields=["keyword","page","limit"]
        removefields.forEach((key)=>delete querycopy[key]);
        // ____________________________________________________________
        // price or rating filter (price[gt]<price<price[lt])
        let querystr=JSON.stringify(querycopy)
        querystr=querystr.replace(/\b(lt|lte|gt|gte)\b/g, (key)=>`$${key}`)
        console.log(querystr)
        this.query=this.query.find(JSON.parse(querystr));
        return this;
    }
    // 3.Pagination- ex you have 9 product so pagination will make 3-3-3 product per page
    Pagination(productperpage){
         const currentpage=Number(this.querystr.page) || 1; // convert in number(this.querystr give string) default 1
        //  ex skipproduct=0 when currentpage=1 no product skip
        // skipproduct=3 when currentpage=2 first 3 product of page 1 skips
        // skipproduct=6 when currentpage=3
         
         const skipproduct=productperpage*(currentpage-1);
         this.query=this.query.limit(productperpage).skip(skipproduct);
         return this;
    }
}

module.exports=Apifeatures