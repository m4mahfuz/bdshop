<template>
  <section class="max-w-6xl p-6 mx-auto bg-white rounded-md shadow-md dark:bg-gray-800">
		<h2 
				class="pb-2 text-lg text-gray-500 capitalize dark:text-white border-b border-purple-100"            
		>
				<span 
						class="border-b-4 border-purple-400 pb-2 pr-1"
				> 
						Add Slide
				</span>
		</h2>
		<form class="mt-4">
        <div class="overflow-hidden shadow sm:rounded-md">
          <div class="bg-slate-50 px-4 py-5 sm:p-6">
            <div class="md:grid md:grid-cols-3">              
							<div class="grid grid-cols-8 col-span-2 gap-6">              
								<div class="col-span-4 relative">
									<label for="discount" class="block text-sm font-medium text-gray-700">Discount Percentage</label>
									<input v-model="slide.discount" type="text" name="discount" id="discount" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
									placeholder="Discount % here"
									>
									<span 
										class="absolute right-0 top-6 p-1.5 text-gray-500 bg-gray-200 border border-l-0 rounded-r-md"										
									>%										
									</span>
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
								<ImageUpload
									:multiple="false"
									:saved="isImagesSaved" 
									directory="slides"
									@uploaded="handleUploaded"
									@removed="handleRemoved" 
								/>
								<p class="mt-2 font-thin text-sm text-gray-500">*Image dimension will be 1976px x 688px</p>
							</div>
						</div>
          <div class="flex gap-4 mt-8 py-3">
						<button @click.prevent="" type="button" class="inline-flex justify-center rounded-md border border-transparent bg-gray-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2">Cancel</button>
            <button @click.prevent="save()" type="button" :disabled="!isValid" class="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-10 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:bg-indigo-400">Save</button>
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
				isImagesSaved: false,
				slide: {
					discount: null,
					title: null,
					description: null,
					active: true,
					url: '',
					image: null,
				},
			}
		},
		computed: {
			isValid() {            
            return (this.slide.image !== null) ? true : false;
        }
		},
		methods: {
			handleUploaded(image) {             
					this.slide.image = image.name;
        },
        handleRemoved(image) {
					this.slide.image = null;
        },
				save() {
            this.loader = true;
            this.isImagesSaved = false;
            // this.product.slug = this.product.name;
            // this.product.categories = this.getSelected('categories');           
            
            this.$axios.$post('/admin/slides', this.slide)
            .then(response => {
								this.loader = false;
                this.isImagesSaved = true;
                this.$toast.info('New Slide Created');
								this.updateStoreSlides(response.data);
                this.reset();
            })
            .catch(error => {                
                this.loader = false;
                // this.setErrors(error.response.data.errors);
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