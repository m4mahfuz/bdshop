<template>
  <div class="container mx-auto p-4">
    <h1 class="text-3xl font-bold mb-4">Sections Page - Next Release</h1>
    <p class="mb-8">We're excited to announce that in our upcoming release, we'll be introducing a brand new
      "Sections Page" feature! With this addition, you'll have the power to customize your home page like never
      before. Tailor the user experience by enabling or disabling specific sections, making it easier to showcase the
      content that matters most to you. Whether it's highlighting recent updates, featured products, or trending
      brands, the choice is yours! Stay tuned for the next release, where you can take full control and create a home
      page that perfectly suits your needs. Happy customizing!</p>

    <h2 class="text-xl font-bold mb-4">Sections Visibility</h2>
    <div class="grid grid-cols-2 gap-4">
      <div>
        <label for="updates" class="flex items-center cursor-pointer">
          <input type="checkbox" id="updates" class="form-checkbox h-5 w-5 text-indigo-600">
          <span class="ml-2 text-gray-700">Show Recent Updates</span>
        </label>
      </div>
      <div>
        <label for="products" class="flex items-center cursor-pointer">
          <input type="checkbox" id="products" class="form-checkbox h-5 w-5 text-indigo-600">
          <span class="ml-2 text-gray-700">Show Featured Products</span>
        </label>
      </div>
      <div>
        <label for="brands" class="flex items-center cursor-pointer">
          <input type="checkbox" id="brands" class="form-checkbox h-5 w-5 text-indigo-600">
          <span class="ml-2 text-gray-700">Show Trending Brands</span>
        </label>
      </div>
      <!-- Add more sections here -->
    </div>
  </div>
</template>

<script>
export default {
    layout: 'dashboard',
}
</script>

<style>

</style>