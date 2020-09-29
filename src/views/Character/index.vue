<template>
  <div class="character">
    <div class="character__wrapper">
      <div class="character__preview">
        <div class="character-view">
          <img :src="currentCharater.cover" alt="Roublard" class="character-view__picture" />
          <div class="character-view__title">{{currentCharater.name}}</div>
        </div>
      </div>

      <div class="character__content">
        <div class="character-selection">
          <div class="character-selection__title">
            Choose your
            wapon & your
            character
          </div>
          <div class="character-selection__slider">
            <character-slider :onClick="handleOnClickSlider" :characters="characters" />
          </div>
        </div>
        <div class="character-desc">
          <div class="character-desc__title">{{ currentCharater.title }}</div>
          <div class="character-desc__content">
            <div class="character-desc__column">
              <h2 class="character-desc__subtitle">{{ currentCharater.baseline }}</h2>
              <p
                class="character-desc__text"
              >{{ currentCharater.description }}</p>
            </div>
            <div class="character-desc__column">
              <h2 class="character-desc__subtitle">Your power & strategy</h2>
              <p
                class="character-desc__text"
              >{{ currentCharater.power }}</p>
            </div>
          </div>
          <div class="character-desc__user">
            <input class="character-desc__input" v-model="userName" />
            <button @click="handleOnFight" class="character-desc__button">Fight!</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import CharacterSlider from "../../components/CharacterSlider/index.vue";
import {CharacterAnimation} from "./animation.js";
const images = require("../../assets/images/**.png");


export default Vue.extend({
  mixins: [CharacterAnimation],

  data() {
    return {
      userName: "",
      indexCharacter: 0,
      characters: [
        {
          cover: images["sadi"],
          image: images["sadi-mini"],
          name: "Sadida",
          color: "#9C992E",
          bg: "#181815",
          title: "Sadida's Shoe",
          baseline: "Plant Summoners",
          description: "They may be nicknamed The Tree People, but Sadidas actually venerate all forms of plant-life. When they're not declaring their unending love to flowers, they can usually be found playing with home-made dolls infused with healing or attacking powers. It's no wonder they can hold their own when danger calls - survival is in their nature!",
          power: "Your can entrave your ennemies with some slow timers"
        },
        {
          cover: images["roublard"],
          image: images["roublard-mini"],
          name: "Roublard",
          color: "#007573",
          bg: "#291B09",
          title: "The rogue Ruse",
          baseline: "Masters of Illusion",
          description: "With heroics, intelligence and cunning in equal measures, it's no surprise that Rogues are criminal masterminds. They're handy with bombs and are quick to blow a fuse, which explains why they tend to leave a trail of smoking craters behind them! For Rogues, trickery is a family affair, so if you dare lay a finger on one of their gang, you can bet that sparks will fly...",
          power: "Your can put a bomb on your way and trap your ennemi. This bomb has a action area and these dommage are letals! You can use your power every 5 minuts..."
        },
        {
          cover: images["iop"],
          image: images["iop-mini"],
          name: "Iop",
          color: "#B6280D",
          bg: "#5e1609",
          title: "Iop's Heart",
          baseline: "Go-getting Warriors",
          description: "Iops are courageous knights who let their weapons do the talking. If they knew what proverbs were, their favorite would definitely be Act before you think. Unfortunately, the size of their brains is inversely proportional to the size of their swords... Still, Iops are great protectors who are always appreciated in groups. Plus, they have such beautiful hair!",
          power: "Your can put a bomb on your way and trap your ennemi. This bomb has a action area and these dommage are letals! You can use your power every 5 minuts..."
        },
        {
          cover: images["enu"],
          image: images["enu-mini"],
          name: "Enutrof",
          color: "#DD8B16",
          bg: "#323924",
          title: "Enutrof's Fingers",
          baseline: "Treasure Hunters",
          description: "That healthy golden glow, that warm, balmy scent, those perfect curves... No Enutrof can resist a shiny new kama! Gifted with an unfailing sense of greed, they'll move earth and sky with their shovels when there's treasure at stake, which makes them great teammates... if you can look past their bad temper and shocking hygiene.",
          power: "Your can put a bomb on your way and trap your ennemi. This bomb has a action area and these dommage are letals! You can use your power every 5 minuts..."
        }
      ]
    };
  },

  components: {
    CharacterSlider
  },

  computed: {
    currentCharater() {
      return this.characters[this.indexCharacter];
    }
  },

  methods: {
    handleOnFight() {
      this.$router.push("/game");
    }
  }
});
</script>