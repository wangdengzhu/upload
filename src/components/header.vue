<template>
	<div>
    <div style="padding:20px;margin-top:50px">
      <div class="show">
        <div class="picture" :style="'backgroundImage:url('+headerImage+')'"></div>
      </div>
      <div class="file-con">
		<label class="label" for="upload">请选择图片</label>
		<input class="file" type="file" id="upload" accept="image/*" @change="upload" multiple>
	  </div>
    </div>
  </div>
</template>

<script>
import EXIF from 'exif-js';
import { compressImg, dataURLtoBlob } from '@/utils/imageManage';

export default {
  data() {
    return {
      headerImage: "",
      picValue: ""
    }
  },
  methods: {
    upload(e) {
      let files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      this.picValue = files[0];
      this.imgPreview(this.picValue);
    },
    imgPreview(file) {
      let self = this;
      let orientation;
      //去获取拍照时的信息，解决拍出来的照片旋转问题
      EXIF.getData(file, function() {
        orientation = EXIF.getTag(this, "Orientation");
      });
      // 看支持不支持FileReader
      if (!file || !window.FileReader) return;
      if (/^image/.test(file.type)) {
        // 创建一个reader
        let reader = new FileReader();
        // 将图片2将转成 base64 格式
        reader.readAsDataURL(file);
        // 读取成功后的回调
        reader.onloadend = function() {
          let result = this.result;
          let img = new Image();
          img.src = result;
          //判断图片是否大于100K,是就直接上传，反之压缩图片
          if (this.result.length <= 100 * 1024) {
            self.headerImage = this.result;
            self.postImg();
          } else {
            img.onload = function() {
              let data = compressImg(img, {orientation,quality: 0.5});
              self.headerImage = data;
              self.postImg();
            };
          }
        }
      }
    },
    postImg() {
      //这里写接口
    }
  }
};
</script>

<style scoped>
.show {
  width: 100px;
  height: 100px;
  overflow: hidden;
  position: relative;
  left: 50%;
  margin-left: -50px;
  border-radius: 50%;
  border: 1px solid #d5d5d5;
}
.picture {
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
}
.file-con{
	position: relative;
	top: 30px;
	left: 0;
}
.label{
    width: 120px;
    height: 30px;
    position: absolute;
    top: 0;
    left: 50%;
    margin-left: -60px;
    z-index: 10;
    background: #00b7ee;
    line-height: 30px;
    border-radius: 5px;
    text-align: center;
  }
  .file{
    display: none;
  }
</style>
