<template>
  <div class="views b_s mr_color01 h_bottom">
    <div class="bg_fff">
      <bot-header :link="link"></bot-header>
      <messageDetail :msg="msg"></messageDetail>
    </div>
  </div>
</template>

<script>
import botHeader from "@/views/components/bot-header/bot-header";
import messageDetail from "./components/messageDetail";
export default {
  components: {
    botHeader,
    messageDetail
  },
  name: "",
  data() {
    return {
      link: "/home/message/messageThree/zgMessage",
      msg: {}
    };
  },
  methods: {
    get_detail() {
      var THIS = this;
      var data = {
        id: THIS.id
      };
      vue_Post(THIS, "msg/msgInfo", data, callback, 1, 1, 1, 1);
      function callback(msg) {
        THIS.msg = msg;
        $("#v_content").html(msg.content);
      }
    }
  },
  mounted() {
    THIS.store.commit("setPageText", "消息 / 招工消息详情");
    this.id = this.$route.params.id ? this.$route.params.id : "";
    this.get_detail();
  },
  beforeDestroy() {
    THIS.store.commit("setPageText", "当前位置：消息 / 招工消息");
  }
};
</script>

<style scoped>
.title {
  font-size: 24px;
  line-height: 50px;
  color: #262626;
}
.info {
  height: 30px;
  line-height: 30px;
  font-size: 14px;
  color: #8c8c8c;
}
.content {
  white-space: pre-line;
}
</style>
