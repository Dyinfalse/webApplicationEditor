<template>
  <div class="LoginBox">
    <div class="loginHeader">
      <div class="headerbox">
        <span class="headername">远舢—Base</span>
      </div>
    </div>
    <div class="loginCentoxBox">
      <div class="loginCentox">
        <div class="centosright">
          <div class="rightheader">
            <div class="headerInfo">
              <div class="infotop">欢迎您</div>
              <div class="infobottom">登录Base平台</div>
            </div>
          </div>
          <div class="rightcontBox">
            <YsLoginModule v-if="!isShowResetPwd" @on-login="onLogin" @on-checkUserFun="onCheckUserFun"
              :LoginBtnloading="LoginBtnloading"></YsLoginModule>
            <ysResetPwd v-if="isShowResetPwd" @on-resetPwd="onResetPwd" :org_user_id="org_user_id">
            </ysResetPwd>
          </div>
        </div>
      </div>
    </div>
    <div class="loginfooter">
      <span>Copyright © 2006-2019</span>
      <span>远舢智能</span>
    </div>
  </div>
</template>
<script>
  import { SysAction } from '@/utils/ys_systemInit'
  export default {
    name: "Login",
    components: {},
    data() {
      return {
        isShowResetPwd: false, // 是否显示修改密码表单
        org_user_id: '', //登录用户ID（登录用户名）
        LoginBtnloading: false, // 登录按钮loading
      };
    },
    methods: {
      // 检测用户是否存在
      onCheckUserFun(userId) {
        SysAction.checkUserById(userId);
      },
      // 登录
      onLogin(loginForm) {
        SysAction.userLogin(loginForm, this.$ysConfig.PaaSCode)
          .then(res => {
            if (res) {
              // 重置密码
              if (res == -1) {
                // 切换重置密码表单
                this.org_user_id = loginForm.org_user_id;
                this.isShowResetPwd = true;
              } else if (res) {
                this.$router.push({
                  name: "/"
                });
              }
            }
            this.LoginBtnloading = false;
          })
          .catch(err => {
            this.$Message.error(err);
            this.LoginBtnloading = false;
          });
      },
      // 修改密码
      onResetPwd(resetPwdInfo) {
        SysAction.resetPwd(resetPwdInfo).then(res => {
          if (res.request_state) {
            this.$Message.success('密码修改成功!');
            // 切回登录
            this.isShowResetPwd = false;
          }
        })
      },
    }
  };
</script>
<style lang="less">
  .LoginBox {
    height: 100%;
    width: 100%;
    background-image: linear-gradient(to bottom, #101a33, #1c363e);

    .loginHeader {
      height: 90px;
      width: 100%;
      padding-left: 65px;

      .headerbox {
        height: 100%;
        line-height: 90px;
        width: 100%;

        .headername {
          font-size: 30px;
          font-family: "DINBek";
          color: rgba(213, 221, 235, 1);
          margin-left: 15px;
          position: relative;
          bottom: 6px;
        }
      }
    }

    .loginCentoxBox {
      width: 100%;
      height: calc(100% - 140px);

      .loginCentox {
        height: 500px;
        width: 25%;
        margin: 0 auto;
        transform: translateY(30%);


        .centosright {
          float: left;
          height: 100%;
          width: 100%;
          padding: 30px 50px;
          background-color: rgba(255, 255, 255, 0.1);
          border-radius: 10px;

          .rightheader {
            height: 23%;
            width: 100%;

            .headerInfo {
              float: left;
              height: 100%;
              width: 50%;

              .infotop {
                width: 100%;
                height: 60%;
                font-size: 32px;
                font-family: "PingFangSC-Regular, PingFangSC";
                font-weight: 400;
                color: rgba(26, 176, 169, 1);
              }

              .infobottom {
                width: 100%;
                height: 40%;
                font-size: 18px;
                font-family: "PingFangSC-Regular, PingFangSC";
                font-weight: 500;
                color: rgba(112, 128, 157, 1);
              }
            }
          }

          .rightcontBox {
            height: 77%;
            width: 100%;
            padding-top: 50px;
          }
        }
      }
    }

    .loginfooter {
      height: 50px;
      width: 100%;
      line-height: 50px;
      text-align: center;
      font-size: 14px;
      font-family: PingFangSC-Regular, PingFangSC;
      font-weight: 400;
      color: rgba(128, 146, 176, 1);
    }
  }
</style>