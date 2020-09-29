<template>
  <div class="home">
    <!-- <div class="home__title">Alpha</div>
    <div class="home__wrapper">
      <h2 class="home__baseline">Enter in the legendary</h2>
      <input v-model="input" class="home__input" />
      <div class="home__action">
        <button @click="handleCreateRoomClick" class="home__button">Create room</button>
        <button @click="handleJoinRoomClick" class="home__button">Join the room</button>
      </div>
    </div>-->
    <canvas id="myCanvas" height="80" width="650"></canvas>
  </div>
</template>

<script>
import Vue from "vue";

export default Vue.extend({
  data() {
    return {
      input: ""
    };
  },

  mounted() {
    window.addEventListener('load',windowLoaded,false);
    function windowLoaded() {
      var canvas = document.getElementById("myCanvas");
      var context = canvas.getContext("2d");

      var text = "I WATCH YOU";
      var xPosition = canvas.width / 2;
      var yPosition = canvas.height / 2;
      var imageDataShadows;
      var imageDataWithShadow;
      var imageObjShadow = new Image();
      var imageObjWithShadow = new Image();

      // canvas.addEventListener("mouseover", glitch, false);

      function glitch() {
        imageObjShadow.onload = function() {
          console.log("deuxieme")
          context.clearRect(0, 0, canvas.width, canvas.height);
          var arr = lineShadowsHeight();
          var sy = 0;
          // console.log(arr);
          for (var i = 0; i < arr.length; i++) {
            context.drawImage( this, 0, sy, canvas.width, arr[i], getRandomInt(-2 * offset(), 2 * offset()), sy, canvas.width, arr[i] );
            sy = sy + arr[i];
          }
          drawText();
          imageDataWithShadow = canvas.toDataURL("image/png", 1.0);

          // imageObjWithShadow.onload = function() {
          //   context.clearRect(0, 0, canvas.width, canvas.height);
          //   context.drawImage( this, 0, 0, canvas.width, canvas.height / 3 + 5, 1, 0, canvas.width, canvas.height / 3 + 5 );
          //   context.drawImage( this, 0, canvas.height / 3 + 5, canvas.width, canvas.height / 3 - 5, 0, canvas.height / 3 + 5, canvas.width, canvas.height / 3 - 5 );
          //   context.drawImage( this, 0, (canvas.height / 3) * 2, canvas.width, canvas.height / 3, 0, (canvas.height / 3) * 2, canvas.width, canvas.height / 3 );
          // };
          imageObjWithShadow.src = imageDataWithShadow;
        };
        console.log("premiere")
        imageObjShadow.src = imageDataShadows;

        // setTimeout(function() {
        //   imageObjWithShadow.onload = function() {
        //     context.clearRect(0, (canvas.height / 3) * 2, canvas.width, canvas.height / 3 );
        //     var arr = lineShadowsHeight();
        //     //console.log(arr);
        //     var sy = 0;
        //     for (var i = 0; i < arr.length; i++) {
        //       context.drawImage( this, 0, sy, canvas.width, arr[i], getRandomInt(-2 * offset(), 2 * offset()), sy, canvas.width, arr[i] );
        //       sy = sy + arr[i];
        //     }

        //   };
        //   imageObjWithShadow.src = imageDataWithShadow;
        // }, 80);

          imageObjWithShadow.onload = function() {
            context.clearRect(0, 0, canvas.width, canvas.height);

            // context.clearRect(0, (canvas.height / 3) * 2, canvas.width, canvas.height / 3 );
            var arr = lineShadowsHeight();
            //console.log(arr);
            var sy = 0;
            for (var i = 0; i < arr.length; i++) {
              context.drawImage( this, 0, sy, canvas.width, arr[i], getRandomInt(-2 * offset(), 2 * offset()), sy, canvas.width, arr[i] );
              sy = sy + arr[i];
            }

          };
          imageObjWithShadow.src = imageDataWithShadow;
      }

      function drawText() {
        context.font = "normal 80px Poppins";
        context.fillStyle = "#FFFFFF";
        context.textAlign = "center";
        context.textBaseline = "middle";
        context.fillText(text, xPosition, yPosition);
      }

      function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
      }

      var lineShadows = function() {
        return Math.floor(Math.random() * (7 - 4 + 1) + 4);
      };

      var offset = function() {
        return Math.floor(Math.random() * (3 - 2 + 1) + 2) * 0.8;
      };

      var lineShadowsHeight = function() {
        var h = canvas.height;
        var count = lineShadows();
        console.log(count);
        var arr = [];
        var s = 0;

        for (var i = 0; i < count; i++) {
          arr[i] = Math.floor(Math.random() * (h / (count - 1) - 2 + 1) + 2);
          h = h - arr[i];
          s = s + arr[i];
          console.log("count", count, s, canvas.height)
          arr[count] = canvas.height - s;
        }
        console.log(arr, "arr")
        return arr;
      };

      function getShadowsImg() {
        context.save();
        context.font = "normal 80px Poppins";
        context.textAlign = "center";
        context.textBaseline = "middle";
        context.globalCompositeOperation = "destination-over";
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.fillStyle = "#a3004a";
        context.fillText(text, xPosition - 2, yPosition);
        context.fillStyle = "#09c4de";
        context.fillText(text, xPosition + 2, yPosition);
        context.restore();

        imageDataShadows = canvas.toDataURL("image/png", 1.0);
      }

      getShadowsImg();
      context.clearRect(0, 0, canvas.width, canvas.height);
      // drawText();

      glitch();
      setInterval(() => glitch(), 2000)
    }
  },

  methods: {
    handleCreateRoomClick() {
      this.$router.push("/characters");
    },

    handleJoinRoomClick() {
      this.$router.push("/characters");
    }
  }
});
</script>