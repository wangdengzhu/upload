<template>
  <div ref="contain">
    <div class="file-con">
      <label class="label" for="file">请选择图片</label>
      <input class="file" type="file" id="file" accept="image/*" @change="upload" multiple>
    </div>
    <div class="img-con" v-for="item of imgUrl">
      <img :src="item">
    </div>
  </div>
</template>

<script>
import EXIF from 'exif-js';
import { compressImg, dataURLtoBlob } from '@/utils/imageManage';

export default {
  data() {
      return {
        imgUrl: []
      }
  },
  methods: {
    upload(event) {
      let self = this;
      let file = event.target.files;
      [...file].map((i) => {
        self.imgUrl.push(URL.createObjectURL(i));
      });
      // let url = window.URL.createObjectURL(file);
      // self.imgUrl = url;
      // this.$refs.contain.append(img);
      // img.onload = (e) => {
      //  debugger
      // }
      
      // let img = new Image();
      // let fr = new FileReader();
      // fr.onload = function() {
      //  self.imgUrl = this.result;
      // }
      // fr.readAsDataURL(file);
    }
  }
}
</script>

<style scoped>
  body{margin: 0;}
  .file-con{
    position: relative;
    top: 0;
    left: 0;
  }
  .label{
    width: 180px;
    height: 30px;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 10;
    background: #00b7ee;
    line-height: 30px;
    border-radius: 5px;
    text-align: center;
  }
  .file{
    display: none;
  }
  .img-con{
    padding-top: 40px;
    width: 200px;
    height: 200px;
  }
  .img-con img{
    width: 100%;
  }
</style>
