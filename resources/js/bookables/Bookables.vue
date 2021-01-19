<template>
   <div>

      <div v-if="loading">
         Data is loading..   
      </div>
      
      <div v-else>
         <div class="row mb-4" v-for="row in rows" :key="'row' + row">
            <div class="col" 
                 v-for="(bookable, column) in bookablesInRow(row)" 
                 :key="'row' + row + column">
               
               <BookableListItem 
                  :item-title="bookable.title" 
                  :item-content="bookable.content" 
                  :price="bookable.price"
               ></BookableListItem>
            </div>
            
            <div class="col"
                 v-for="p in placeholdersInRow(row)"
                 :key="'placeholder' + row + p">
            </div>
         </div>
         
      </div>
   </div>
</template>

<script>
   import BookableListItem from "./BookableListItem";
   
   export default {
      components: {
         BookableListItem
      },
      data() {
         return {
            bookables: null,
            loading: false,
            columns: 3
         };
      },
      computed: {
         rows() {
            return this.bookables === null ? 0 : Math.ceil(this.bookables.length / this.columns);
         }
      },
      methods: {
        bookablesInRow(row) {
           return this.bookables.slice((row - 1) * this.columns, row * this.columns);
        },
        placeholdersInRow(row) {
           return this.columns - this.bookablesInRow(row).length;
        }
      },
      created() {
         this.loading = true;
         setTimeout(() => {
            this.bookables = [{
               title: "Cheap Villa",
               content: "A very cheap villa",
               price: 400
            },
            {
               title: "Cheap Villa 2",
               content: "A very cheap villa 2",
               price: 500
            },
            {
               title: "Expensive Villa 1",
               content: "A expensive villa",
               price: 10000
            },
            {
               title: "Average Villa 2",
               content: "Average villa 2",
               price: 1300
            },
            {
               title: "Cheap Villa 3",
               content: "A very cheap villa",
               price: 580
            },
            {
               title: "Average Villa",
               content: "A very average villa 2",
               price: 600
            },
            {
               title: "Cheap Villa 9",
               content: "A very cheap villa",
               price: 580
            }
            ];
            this.loading = false;
         }, 2000);      
      }
   };
</script>