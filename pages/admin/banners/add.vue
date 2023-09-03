<template>
  <section class="max-w-6xl p-6 mx-auto bg-white rounded-md shadow-md dark:bg-gray-800">
		<h2 
				class="pb-2 text-lg text-gray-500 capitalize dark:text-white border-b border-purple-100"            
		>
				<span 
						class="border-b-4 border-purple-400 pb-2 pr-1"
				> 
						Add Banner
				</span>
		</h2>
		<form class="mt-4">
        <div class="overflow-hidden shadow sm:rounded-md">
          <div class="bg-slate-50 px-4 py-5 sm:p-6">
            <div class="md:grid md:grid-cols-3">              
							<div class="grid grid-cols-8 col-span-2 gap-6">              								
								<div class="col-span-7">
									<label for="offerType" class=" text-gray-600 dark:text-gray-400 text-sm">Available Offers</label>
									<select 
											v-model="offer" id="offerType" 
											class="block px-4 text-sm mt-2 w-full text-gray-900 bg-gray-50 rounded-md border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
									>
											<option disabled value="">Please select one</option>
											<option v-for="offer in activeOffers" :key="offer.id" :value="offer">{{offer.name}}</option> 											
									</select>                    
								</div>
								<div class="col-span-7">
									<label for="title" class="block text-sm font-medium text-gray-700">Title/Heading</label>
									<input v-model="banner.title" type="text" name="title" id="title"  class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
									placeholder="Title here"
									>
								</div>
								<div class="col-span-7">
									<label for="description" class="block text-sm font-medium text-gray-700">Description</label>
									<textarea v-model="banner.description" rows="2" name="title" id="title"  class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"								
									placeholder="Description here"
									></textarea>
									<p class="text-xs py-2">*Keep very short</p>
									<!-- <p class="text-xs pb-2">*Separate sentence using '/b' at the end.</p> -->
								</div>
			
								<div class="col-span-7">
									<label for="url" class="block text-sm font-medium text-gray-700">URL</label>
									<input v-model="banner.url" type="text" name="url" id="url"  class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm bg-gray-100"
									placeholder="Url will generate automatically"
									disabled
									>
								</div>
							</div>
							<div class="mt-4 md:mt-0">
								<div v-if="offer !== ''" class="text-sm my-4 px-4 py-2 bg-blue-100 shadow rounded-md">
									<ul class="space-y-2">
										<li class="text-lg text-blue-600 border-b border-blue-300">{{ offer.name }}</li>
										<li class="font-semibold">{{ offer.starting }} to {{ offer.ending }}</li>
										<li>Amount: {{ offer.amount }}</li>
										<li>Type: {{ offer.type }}</li>
									</ul>
								</div>
								<ImageUpload
									:multiple="false"
									:saved="isImagesSaved" 
									directory="banners"
									@uploaded="handleUploaded"
									@removed="handleRemoved" 
								/>
								<p class="mt-2 font-thin text-sm text-gray-500">*Image dimension will be 840px x 535px</p>								
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
import {mapActions, mapState} from "vuex";
export default {
    layout: 'dashboard',
		data() {
			return {
				isImagesSaved: false,
				offer: '',
				amount: '',
				banner: {
					// discount: null,
					title: null,
					description: null,
					active: true,
					url: '',
					image: null,
				},
			}
		},
		watch: {
			'offer.id'(value) {
				this.banner.url = `offers/${value}`;
			},
			'offer.name'(value) {
				this.banner.title = value;
			}
		},  
		mounted() {
			this.getActiveOffers('/admin/offers');
		},
		computed: {
			...mapState('offers', ['activeOffers']),
			isValid() {            
            return (this.banner.image !== null) ? true : false;
        }
		},
		methods: {
			...mapActions('offers', ['getActiveOffers']),
			handleUploaded(image) {             
					this.banner.image = image.name;
        },
        handleRemoved(image) {
					this.banner.image = null;
        },
				save() {
            this.loader = true;
            this.isImagesSaved = false;
            this.$axios.$post('/admin/banners', this.banner)
            .then(response => {
								this.loader = false;
                this.isImagesSaved = true;
                this.$toast.info('New Banner Created');
								this.updateStoreBanners(response.data);
                this.reset();
            })
            .catch(error => {                
                this.loader = false;
                // this.setErrors(error.response.data.errors);
            })            
        },
				reset() {
					this.banner = {
						title: null,
						description: null,
						active: true,
						image: null,
					}
				},				
		}
}
</script>