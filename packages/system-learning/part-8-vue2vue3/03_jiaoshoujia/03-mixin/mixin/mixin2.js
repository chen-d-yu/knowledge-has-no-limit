export default {
  data() {
    return {
      mName: "mixin2",
    };
  },
  methods: {
    showName() {
      console.log("2");
      console.log(this.name);
    },
  },
};
