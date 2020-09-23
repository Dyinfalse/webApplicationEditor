<template>
	<div class="headerTabs">
		<div class="ys-tabs" id="parentTab">
			<template>
				<div @click="toUrl(tab)" v-for="tab in tabsItemList" :key="tab.name"
					:class="(tab.isActive ? 'ys-header-active': '') + ' tabs2 ys-tabs-item ys-header'">
					<span class="title">
						{{tab.name}}
					</span>
					<span v-if="tabsItemList.length > 1" @click.stop="closeTab(tab)" class="close-icon iconfont icon-guanbi"></span>
				</div>
			</template>
		</div>
	</div>
</template>

<script>
	import elementResizeDetectorMaker from "element-resize-detector";
	import {
		showTitle
	} from "ys-base-js";
	import {
		mapGetters,
		mapActions
	} from "vuex";
	export default {
		name: "HeaderTabs",
		data() {
			return {
				tabsItemList: [],
			};
		},
		mounted() {
			this.addTab(this.$route);
		},
		methods: {
			/**
			 * add tab
			 */
			addTab(router){
				let find;
				for(let r of this.tabsItemList){
					r.isActive = false;
					if(r.name != router.name){ continue };
					find = r;
				}
				if (find) {
					find.isActive = true;
					return;
				} else {
					this.tabsItemList.push({
						name: router.name,
						path: router.path,
						isActive: true
					});
				}
			},
			/**
			 * 关闭tab
			 */
			closeTab(tab){
				let currentIndex = this.tabsItemList.findIndex(r => r == tab);
				this.tabsItemList.splice(currentIndex, 1);
				this.toNext(currentIndex);
			},
			/**
			 * 去下一个
			 */
			toNext(currentIndex){
				let nextIndex = this.tabsItemList.length == 1 ?
					0 :
					this.tabsItemList[currentIndex] ?
						currentIndex :
						currentIndex - 1;
				this.toUrl(this.tabsItemList[nextIndex]);
			},
			toUrl(router) {
				this.$router.push(router.path);
			}
		},
		computed: {

		},
		watch: {
			$route(to, from){
				this.addTab(to);
			}
		}
	};
</script>

<style scoped>
	@import '//at.alicdn.com/t/font_1935013_zt52o03wsi.css';
</style>
<style lang="less" scoped>
	.headerTabs {
		height: 100%;
		width: 100%;
		position: relative;
		display: flex;

		.ys-tabs {
			height: 50px;
			width: calc(100% - 50px);
			position: absolute;
			left: 0;
			bottom: 0;

			&-item {
				font-family: PingFangSC-Medium, PingFang SC;
				border-top-right-radius: 5px;
				border-top-left-radius: 5px;
				margin-right: 3px;
				position: relative;
				float: left;
				display: flex;
				justify-content: center;
				align-items: center;

				.big-icon {
					font-size: 24px;
				}
			}

			.tabs1 {
				height: 50px;
				width: 50px;
				cursor: pointer;
			}

			.tabs2 {
				height: 50px;
				width: 150px;
				padding: 5px 10px;

				.title {
					width: 85%;
					height: 100%;
					display: block;
					cursor: pointer;
					padding: 0 5px;
					text-align: center;
					line-height: 40px;
					overflow: hidden;
					white-space: nowrap;
					text-overflow: ellipsis;
				}

				.close-icon {
					width: 15%;
					height: 50%;
					display: flex;
					justify-content: center;
					align-items: center;
					cursor: pointer;
					overflow: hidden;

					&:hover {
						font-weight: 800;
					}
				}
			}
		}

		.unfold {
			height: 80%;
			width: 50px;
			position: absolute;
			right: 0;
			bottom: 0;

			.ivu-dropdown {
				height: 100%;

				&-rel {
					.downListBtn {
						height: 55px;
						width: 50px;
						clear: white;
						border-top-right-radius: 5px;
						border-top-left-radius: 5px;
						font-size: 25px;
						display: inline-block;
						display: flex;
						justify-content: center;
						// align-items: center;
						cursor: pointer;
					}
				}

				.ivu-dropdown-menu {
					.ivu-dropdown-item {
						padding: 0 5px;
						background-color: transparent;

						.down-Item {
							width: 100%;
							height: 35px;
							border-radius: 0;
							margin: 2px 0 0 0;
							padding: 0 5px;

							.down-title {
								width: 85%;
								height: 100%;
								font-size: 14px;
								display: block;
								cursor: pointer;
								padding: 0 5px;
								text-align: center;
								line-height: 35px;
							}

							.down-close-icon {
								width: 15%;
								height: 50%;
								display: flex;
								justify-content: center;
								align-items: center;
								cursor: pointer;
								font-size: 14px;

								&:hover {
									font-weight: 800;
								}
							}
						}
					}
				}
			}
		}
	}
</style>