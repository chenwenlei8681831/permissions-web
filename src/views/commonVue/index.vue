<template>
  <div></div>
</template>

<script>
import tableMinxins from "@/mixins/tableMixins";
export default {
  name: "",
  mixins: [tableMinxins],
  data() {
    return {
      page: 1,
      count: 10,
      selectData: {},
      url: "/platform/list"
    };
  },
  methods: {},
  created() {
    THIS.store.commit("setPageText", "");
    let { count, page } = this;
    this.getTables({ page, count });
  }
};
</script>

<style scoped>
</style>
