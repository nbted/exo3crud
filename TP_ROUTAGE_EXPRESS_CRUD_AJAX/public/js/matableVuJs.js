window.onload=function(){
	let page=0;
  let pagesize=10;
	let pagesizemax;

	var table = new Vue({
		el:'#app',
		data: {
			
			restaurants : []

		} ,
		 mounted() { 
            console.log("--- MOUNTED composé prêt à être affiché---");
              this.getDataFromServer();
           },

		methods :{
			countRestaurant: function(){
       let url ="api/restaurantNombre";
       fetch(url)
       .then(response => {
        return response.json();
       })
       .then(compte => {

         pagesizemax = compte.data;
         console.log("pagesizemax =" +pagesizemax);
       })},
			getDataFromServer: function() {
      // On récupère les données par fetch sur un serveur
      // acceptant le cross domain
         let url;
                if (page===0 ) {
      
                    url = "/api/restaurants"
                    previousButton.disabled=true;
   
                     }
                else if (page > 0) {
                url = "/api/restaurants?page=" + page ;
                }

            else{
                 console.log("fininnnnnn") ;

              }
          fetch(url)
       .then(response => {
         return response.json();
        })
       .then(rest => {
         console.log("preee"+rest.data[0].name);
         this.restaurants = rest.data;
         pagesizemax=rest.data.length;
         console.log("pagesizemax =" +pagesizemax);

         
         /*for (var i = 0 ; i < rest.data.length ; i++) {
         	 var nomk = rest.data[i].name;
         	this.noms.push(nomk);
         }

         for (var i = 0; i< rest.data.length ;  i++) {
         	let cuisine = rest.data[i].cuisine;
         	this.cuisines.push(cuisine);
         }*/
         
         
       }).catch(err => {
         console.log("erreur dans le get : " + err)
       });
        },


        pageadd: function (){
              page++;
              previousButton.disabled = false;
              pagesizemax-=pagesize;
              console.log("pagesizemax =" +pagesizemax);
              if (pagesizemax===pagesize) 
                  nextButton.disabled = true;
              
             
             this.getDataFromServer();
            }
            ,
       pagerem: function (){
           if(page > 0) 
           {
              page-- ;
              nextButton.disabled = false;
             if(page ===0) previousButton.disabled = true;
            }
          this.getDataFromServer();
        }
        



        }
      
		

		
});
}
