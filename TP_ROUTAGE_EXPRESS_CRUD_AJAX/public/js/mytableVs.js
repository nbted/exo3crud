// register the grid component
window.onload=function(){
   let page=0;
   let pagesize=10;
   let pagesizemax;
  Vue.component('demo-grid', {
  template: '#grid-template',
  props: {
    data: Array,
    columns: Array,
    filterKey: String
  },
  data: function () {
    var sortOrders = {}
    this.columns.forEach(function (key) {
      sortOrders[key] = 1
    })
    return {
      sortKey: '',
      sortOrders: sortOrders
    }
  },
  computed: {
    filteredData: function () {
      var sortKey = this.sortKey
      var filterKey = this.filterKey && this.filterKey.toLowerCase()
      var order = this.sortOrders[sortKey] || 1
      var data = this.data
      if (filterKey) {
        data = data.filter(function (row) {
          return Object.keys(row).some(function (key) {
            return String(row[key]).toLowerCase().indexOf(filterKey) > -1
          })
        })
      }
      if (sortKey) {
        data = data.slice().sort(function (a, b) {
          a = a[sortKey]
          b = b[sortKey]
          return (a === b ? 0 : a > b ? 1 : -1) * order
        })
      }
      return data
    }
  },
  filters: {
    capitalize: function (str) {
      return str.charAt(0).toUpperCase() + str.slice(1)
    }
  },
  methods: {
    sortBy: function (key) {
      this.sortKey = key
      this.sortOrders[key] = this.sortOrders[key] * -1
    }
  }
})

// bootstrap the demo
var demo = new Vue({
  el: '#ted',
  data: {
    searchQuery: '',
    gridColumns: ['name', 'cuisine'],
    restaurants: [ ]
  },
  mounted() { 
            console.log("--- les restaurants sont pret à être affichés---");
              this.countRestaurant();
              this.getDataFromServer();

           },
  methods:{
    countRestaurant: function(){
       let url ="api/restaurantNombre";
       fetch(url)
       .then(response => {
        return response.json();
       })
       .then(compte => {

         pagesizemax = compte.data;
         console.log("pagesizemax =" +pagesizemax);
       })

    },
    getDataFromServer: function() {
      // On récupère les données par fetch sur un serveur
      // acceptant le cross domain
         let url;
                if (page===0 || page===1 ) {
      
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
         console.log(rest.data[0].name);
         this.restaurants = rest.data;
        
         
         
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
})
}

