<template>
    <div>      
      <p class="text-gray-600">{{ generateExcerpt(content.message, maxLength) }} 
        </p>
    <span v-if="content.message.length > maxLength" @click.prevent="goTo(content)" class="font-semibold text-blue-500 cursor-pointer">read more</span>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      content: {
        type: Object,
        required: true
      },
      maxLength: {
        type: Number,
        default: 150, // Set a default maximum length for the excerpt
      },
    },
    methods: {
      generateExcerpt(text, maxLength) {
        if (text.length <= maxLength) {
          return text;
        }
        // return text.slice(0, maxLength) + '...';
        return text.slice(0, maxLength);
      },
      goTo(content) {
        localStorage.setItem('contact', JSON.stringify(content));
        this.$emit('readmore-clicked', content);
        this.$router.push(`/admin/contacts/${content.id}/message`);
      }
    },
  };
  </script>
  
  <style scoped>
  /* Apply Tailwind CSS classes here if needed */
  </style>
  