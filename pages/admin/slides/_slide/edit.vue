<template>
  <section class="max-w-6xl p-6 mx-auto bg-white rounded-md shadow-md dark:bg-gray-800">
		<h2 
				class="pb-2 text-lg text-gray-500 capitalize dark:text-white border-b border-orange-100"            
		>
				<span 
						class="border-b-4 border-orange-400 pb-2 pr-1"
				> 
						Edit Slide
				</span>
		</h2>
		<form class="mt-4">
        <div class="overflow-hidden shadow sm:rounded-md">
          <div class="bg-slate-50 px-4 py-5 sm:p-6">
            <div class="md:grid md:grid-cols-3">              
							<div class="grid grid-cols-8 col-span-2 gap-6">              
								<div class="col-span-4">
									<label for="discount" class="block w-full text-sm font-medium text-gray-700">Discount Percentage</label>
                  <div class="flex justify-start items-center">

									<input v-model="slide.discount" type="text" name="discount" id="discount" class="mt-2 w-full rounded-l-md border-r-0 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
									placeholder="Discount % here"
									>
                  <!-- <div class="absolute right-0 top-14 lg:top-9"> -->
                    <span 
                      class="mt-2 p-1.5 text-gray-500 bg-gray-200 border border-l-0 rounded-r-md"										
                    >%										
                    </span>
                  </div>
                  <!-- </div> -->
                  
								</div>
								<div class="col-span-7">
									<label for="title" class="block text-sm font-medium text-gray-700">Title/Heading</label>
									<input v-model="slide.title" type="text" name="title" id="title"  class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
									placeholder="Title here"
									>
								</div>
								<div class="col-span-7">
									<label for="description" class="block text-sm font-medium text-gray-700">Description</label>
									<textarea v-model="slide.description" rows="2" name="title" id="title"  class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"								
									placeholder="Description here"
									></textarea>
								</div>
								<div class="col-span-7">
									<label for="url" class="block text-sm font-medium text-gray-700">URL</label>
									<input v-model="slide.url" type="text" name="url" id="url"  class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
									placeholder="Url here"
									>
								</div>
							</div>
							<div class="mt-4 md:mt-0">
                <label class="mb-2 block text-sm font-medium text-gray-700">Image</label>
                <a :href="url(slide.image, 'large')" target="_blank">
                  <img :src="url(slide.image)" alt="">
                </a>								
							</div>
						</div>
          <div class="flex justify-between items-center mt-8 py-3">
            <button @click.prevent="update()" type="button" class="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-10 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">Update</button>
            <button @click.prevent="" type="button" class="inline-flex justify-center rounded-md border border-transparent bg-gray-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2">Back</button>
          </div>
					</div>
				</div>
      </form>
	</section>
</template>

<script>
export default {
    layout: 'dashboard',
		data() {
			return {
				// isImagesSaved: false,
				slide: {
					discount: null,
					title: null,
					description: null,
					active: '',
					image: null,
					url: '',
				},
			}
		},
    mounted() {
      let slide = this.getSlideBy(this.$route.params.slide);            
      this.fillupFormByFound(slide);
    },
		methods: {			
        getSlideBy(id) {
            // let slide = this.slideBy(id);
            // if (slide === undefined) {
                return JSON.parse(localStorage.getItem('slide'));
            // }
            // return slide;
        },
        fillupFormByFound(slide) {            
            this.slide.id = slide.id;
            this.slide.title = slide.title;
            this.slide.discount = slide.discount;
            this.slide.description = slide.description;
            this.slide.active = slide.active;
            this.slide.url = slide.url;              
            this.slide.image = slide.image;              
        },
        url(image, type="small") {
            if (image === null) {
              return require('~/assets/no_image_icon.png');
            }
            // let name = image;
            let  path = (type === 'small') ? `/storage/images/slides/small/${image}` : `/storage/images/slides/large/${image}`;
            return `${this.$config.baseURL}${path}`;
        },
				update() {
            this.loader = true;
            
            this.$axios.$patch(`/admin/slides/${this.slide.id}`, this.slide)
            .then(response => {
								this.loader = false;
                this.$toast.success('Slide Updated');
            })
            .catch(error => {                
                this.loader = false;
            })            
        },
				reset() {
					this.slide = {
						discount: null,
						title: null,
						description: null,
						active: true,
						image: null,
					}
				},				
		}
}
</script>

<style>

</style>