<template>
  <div class="p-4 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
        <label class="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-300" for="imageUpload">Upload Image</label>
        
        <input 
            class="block mb-5 pr-2 w-full text-sm text-gray-500 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400
            file:mr-2 file:py-2 file:px-3
            file:rounded-l-lg file:border-0
            file:text-sm file:font-semibold
            file:bg-violet-50 file:text-violet-700
            hover:file:bg-violet-100"
            id="imageUpload" 
            type="file"
            name="image"            
            @change="onFileChange"
        >

        <div class="my-3">		  	
            <img :src="imagePreview" width="120" height="100" v-show="showPreview"/>
        </div>

        <div class="flex mt-6 gap-2">
            <button class="px-2 py-2 leading-5 text-white text-sm transition-colors duration-200 transform bg-gray-500 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600" @click.prevent="reset()" :disabled="!isValid">Cancel</button>
            
            <button @click.prevent="upload()" type="button" :disabled="!isValid" class="px-6 py-2 leading-5 text-white text-sm transition-colors duration-200 transform bg-sky-500 rounded-md hover:bg-sky-600 focus:outline-none focus:bg-sky-600 disabled:bg-sky-300">Upload</button>
        </div>

        <div class="p-2" v-if="isImageAvailable">            
            <table class="table">
                <thead class="thead-light">
                <tr>
                    <th scope="col" class="px-2">#</th>
                    <th scope="col" class="px-2">Image</th>
                    <!-- <th scope="col" class="px-2">Title</th> -->
                    <th scope="col" class="px-2">Action</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(image, index) in images" :key="index">
                    <th scope="row">{{index+1}}</th>
                    <td>
                    <img :src="url(image)" width="100" height="100" />
                    </td>                    
                    <!-- <td>
                    {{image.title}}
                    </td> -->
                    <td class="text-center">
                    <button @click.prevent="remove(image)" class="text-red-400 hover:text-red-500">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                        </svg>
                    </button> 
                    </td>
                </tr>    
                </tbody>
            </table>                                     
        </div>         

    </div>
</template>

<script>
import swal from 'sweetalert';
export default {
    props: {
        directory: null,
        multiple: false,
        icon: false,
        saved: false,
    },
    data() {
        return {
            // baseURL: this.$config.baseURL,
            errors: {},
            formData: {
                image: null
            },
            images: [],
            imagePreview: null,
            showPreview: false 
        }
    },
    mounted() {
        console.log('Image Uploader Mounted')
        // console.log(this.$config.baseURL)
    },
    watch: {
        saved(value) {
            if(value === true) {
                this.emptyImagesArray();        			
            }
        },
    },
    computed: {
        isImageAvailable() {
            return (this.images.length > 0) ? true : false;
        },
        isValid() {            
            return this.formData.image !== null;
        },
    },

    methods: {
        actionAlert(icon, message) {
            swal({           
                title: 'Image Upload',
                text: `${message}`,
                icon: icon,
                timer: 3000,
                closeOnClickOutside: false,
            })
        },
        emptyImagesArray() {
            this.images = [];
        },
        onFileChange(event) {
            this.formData.image = event.target.files[0];
            // console.log(this.formData.image)
            // if (!this.multiple) {
            //     this.dispatchEventFileSelected();
            // }
            this.handleImagePreview();			    
        },
        // dispatchEventFileSelected() {
        //     let data = {
        //         image: this.formData.image,
        //         directory: this.directory
        //     }
        //     this.$emit('selected', data);
        // },
        handleImagePreview() {
            /*
            Initialize a File Reader object
            */
            let reader  = new FileReader();
            /*
            Add an event listener to the reader that when the file
            has been loaded, we flag the show preview as true and set the
            image to be what was read from the reader.
            */
            reader.addEventListener("load", function () {
                this.showPreview = true;
                this.imagePreview = reader.result;
            }.bind(this), false);
            /*
            Check to see if the file is not empty.
            */
            if(this.formData.image){
                /*
                    Ensure the file is an image file.
                */
                if ( /\.(jpe?g|png|gif|webp)$/i.test(this.formData.image.name) ) {
                    console.log("here");
                    /*
                    Fire the readAsDataURL method which will read the file in and
                    upon completion fire a 'load' event which we will listen to and
                    display the image in the preview.
                    */
                    reader.readAsDataURL(this.formData.image);
                }
            }
        },
        upload() {
            let formData = new FormData();
            formData.append('image', this.formData.image);
            formData.append('directory', this.directory);
            if(!this.multiple) {
                if (this.images.length === 1) {
                    let message = `Sorry! You cann't upload more than one file`;
                    this.actionAlert('warning', message);
                    return;	
                }
            }
            this.$axios.$post('/images', formData)
            .then((response) => {
                console.log(response.data);
                this.actionAlert('success', response.data.message);
                this.reset();
                let image = this.dispatchEventUploaded(response.data);
                this.addToImagesArray(image);
            })
            .catch((error) => {
                console.log(error.response.data);
                this.errors = error.response.data.errors;
            });
        },
        dispatchEventUploaded(data) {        	
            let image = {
              name: data.name,
              path: data.path,
            }
            this.$emit('uploaded', image);
            return image;
        },          
        addToImagesArray(image) {
            this.images.push(image);            	
        },
        url(image) {
            // let path = image.path;
            // let path = '/storage/images/products/small/';
            let name = image.name;
            let path = `/storage/images/${this.directory}/small/`;
            if (this.icon) {
                path = `/storage/images/${this.directory}/`;
            }
            // return `${this.$config.baseURL}${path}`;
            return `${this.$config.baseURL}${path}${name}`;
        },
        remove(image) {
          	this.$axios.$delete('/images/delete', {data: {path: image.path}})
		      		.then((response) => {
		      			this.actionAlert('info', 'Image deleted successfully.');
		      			// this.reset();
		      			this.dispatchEventRemoved(image);
		            this.removeFromImagesArray(image);
		      		})
		      		.catch((error) => {
		      			// console.log(error.response.data);
		      			this.errors = error.response.data.errors;
		      		});
        },
        dispatchEventRemoved(image) {
            this.$emit('removed', image);
        },
        removeFromImagesArray(image) {
            let index = this.images.indexOf(image);
            // console.log('iupIndx', index);
            this.images.splice(index, 1);
        },
        reset() {
            // this.formData.image = null;
            this.formData = {
                image: null,
            };
            this.imagePreview = null;
            this.showPreview = false;
            this.errors = {};
            // this.images = [];
        },
        has(field) {
            return this.errors.hasOwnProperty(field);
        },   
        get(field) {		    	
                if (this.errors[field]) {
                return this.errors[field][0];
            }
        }
    }
}
</script>

<style>

</style>