<template>
   <div>
      <span v-if="!loading">Check!</span>
         <span v-if="loading"><i class="fas fa-cog fa-spin"></i> 
            <slot></slot>
         </span>
   </div>
</template>

<script>
   export default {
      props: {
         loading: Boolean
      }
   }
</script>