<script>
import SelectableImageComponent from './components/SelectableImageComponent.vue'
export default {
  components:{
    SelectableImageComponent,
  },
  data() {
    return {
      challenge: null,
      images: [],
      isSelected: [],
      answer: "",
    };
  },
  methods: {
    postAnswer() {
      fetch(`http://localhost:3001/response/${this.challenge}`, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ "selected": this.isSelected })
      })
        .then(response => response.text())
        .then(text => this.answer = text);
    }
  },
  mounted() {
    fetch(`http://localhost:3001/challenge`)
      .then(res => res.json())
      .then(json => {
        this.challenge = json.challenge
        this.images = json.images
        this.isSelected = this.images.map(() => false)
      })
  },
}
</script>

<template>
  (challenge: {{ challenge }})
  <table>
    <tr v-for="row in [0, 1, 2]">
      <td v-for="col in [0, 1, 2]">
        <SelectableImageComponent v-bind:src="images[row * 3 + col]" v-model="isSelected[row * 3 + col]" />
      </td>
    </tr>
  </table>
  <button v-on:click="isSelected = images.map(() => false)">Reset</button>
  <button v-on:click="postAnswer">Validate</button> {{ answer }}
</template>

