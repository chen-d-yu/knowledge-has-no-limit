export default {
  data() {
    return {
      mName: "mixin1",
    };
  },
  methods: {
    showName() {
      console.log("1");
      console.log(this.name);
    },
  },
};
