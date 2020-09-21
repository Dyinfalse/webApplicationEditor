<template>
    <div class="ruler-canvas-content designer-common-content flex" ref="ruler-canvas-content" id="canvas-panel-wrap">
        <div ref='ruler-panel' id="ruler-canvas-scroll" class="canvas-content-panel">
            <!-- 标尺 -->
            <div class="canvas-content" ref="canvas-content"
                :style="{width:RULER_REPAIR_SIZE_WIDTH+'px',height:RULER_REPAIR_SIZE_HEIGHT+'px'}">
                <div class="navigator-line" v-if="GuideLineShow">
                    <div class="navigator-line-top" :style="{height: navigatorLine.y+'px',left:navigatorLine.x+'px'}">
                    </div>
                    <div class="navigator-line-left" :style="{width: navigatorLine.x+'px',top:navigatorLine.y+'px'}">
                    </div>
                    <div class="navigator-line-value"
                        :style="{left: navigatorLine.x +10 +'px',top:navigatorLine.y - 30+'px'}">
                        <span>{{navigatorLine.valueX +','+ navigatorLine.valueY}}</span>
                    </div>
                </div>
                <div class="ruler-components">
                    <div title="toggle Guide lines" class="corner designer-common-ruler-back" @click="indicatopLineAllShow"
                        >
                        <!-- <Icon :type="INDICATOR_LINE_ALL_SHOW ? 'ios-eye' : 'ios-eye-outline'" /> -->
                    </div>
                    <div id='line-top' ref="lineTop">
                        <canvas id="canvas-top" @mouseenter='Mouseenter($event,"top")'
                            class="designer-common-ruler-back"></canvas>
                        <div class="indicator-dashed-top indicator-dashed" title="单击添加" v-if="INDICATOR_SHOW"
                            :style="{left:INDICATOR_LEFT+'px',height:RULER_REPAIR_SIZE_HEIGHT+'px',borderColor:lineColor}">
                            <div class="indicator-hover">
                                <span class="line-value" title="单击添加">{{INDICATOR_NUM}}</span>
                            </div>
                        </div>
                        <div class="indicator-line-content" v-show="INDICATOR_LINE_ALL_SHOW">
                            <div class="indicator-solid-top indicator-solid" title="双击删除"
                                @dblclick='blclickDel(index,"top")' @mousedown='Mousedown($event,item,index,"top")'
                                v-for="(item,index) in INDICATOR_LINE_TOP" :key="index"
                                :style="{left:item.left+'px',height:RULER_REPAIR_SIZE_HEIGHT+'px',borderColor:lineColor}">
                                <div class="indicator-action">
                                    <span class="line-value">{{item.value}}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div id="line-left">
                        <canvas id="canvas-left" @mouseenter='Mouseenter($event,"left")'
                            class="designer-common-ruler-back"></canvas>
                        <div class="indicator-dashed-left indicator-dashed" title="单击添加" v-if="INDICATOR_LEFT_SHOW"
                            :style="{left:INDICATOR_LEFT+'px',width:RULER_REPAIR_SIZE_WIDTH+'px',borderColor:lineColor}">
                            <div class="indicator-hover" style="cursor:n-resize;">
                                <span class="line-value" title="单击添加">{{INDICATOR_NUM}}</span>
                            </div>
                        </div>
                        <div class="indicator-line-content" v-show="INDICATOR_LINE_ALL_SHOW">
                            <div class="indicator-solid-left indicator-solid" title="双击删除"
                                @dblclick='blclickDel(index,"left")' @mousedown='Mousedown($event,item,index,"left")'
                                v-for="(item,index) in INDICATOR_LINE_LEFT" :key="index"
                                :style="{top:item.left +'px',width:RULER_REPAIR_SIZE_WIDTH+'px',borderColor:lineColor}">
                                <div class="indicator-action">
                                    <span class="line-value">{{item.value}}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
                <!-- 画布 -->
                <div class="ruler-canvas-panel" ref='ruler-canvas-panel' id="ruler-canvas-panel"
                    :style="{...comStyle, width: this.$P.store.pageConfig.displayWidth + 'px', height: this.$P.store.pageConfig.displayHeight + 'px'}"
                    @mousedown='mousedown'>
                    <div class="gridBack ruler-canvas-panel-box" id="canvas-box">
                        <NavMenu v-if="$P.store.pageConfig.openNavMenuAble"></NavMenu>
                        <router-view v-else :key="$route.fullPath"/>
                    </div>
                </div>
            </div>
        </div>
        <!-- 缩放 -->
        <div class="ruler-slider">
            <!-- <button @click='add'>添加</button> -->
            <div @click="removeSize(ZOOM_RATIO)">
                <Icon class="ys-common-FontColor ruler-slider-icon" type="ios-remove" />
            </div>
            <div class="ys-common-FontColor slide-size">
                <!-- <el-slider  @on-change='SliderChange' show-input :input-size='"small"' :step="10" :max="200" :min="10"
                    v-model="ZOOM_RATIO" :tip-format="format"></el-slider> -->

                    <Slider  @on-change='SliderChange' show-input :input-size='"small"' :step="10" :max="200" :min="10"
                    v-model="ZOOM_RATIO"></Slider>
            </div>
            <div @click="addSize(ZOOM_RATIO)">
                <Icon class="ys-common-FontColor ruler-slider-icon" type="ios-add" />
            </div>
            <div @click='isSketchMap=!isSketchMap'>
                <Icon class="ruler-slider-icon ruler-slider-icon" style='font-size: 20px;' type="ios-browsers-outline" />
            </div>
        </div>
        <!-- /**** 画布略缩图 */ -->
        <transition name="ScaleSketchMap">
            <div v-show='isSketchMap' class="canvas-sketch-map">
                <div ref='ScaleSketchMap' class="canvas-select-content">
                    <div ref="canvas-select-span" class="canvas-select-span" v-drag></div>
                </div>
            </div>
        </transition>
    </div>

</template>

<script>
import vdr from './vue-draggable-resizable-gorkys/vue-draggable-resizable.vue'
import Page from '../Page';
import NavMenu from '../graceComponents/NavMenu';
export default {
        components:{
            vdr, Page, NavMenu
        },
        name: 'Ide-ruler',
        props: {
            scroll: {
                type: Boolean,
                default () {
                    return true
                }
            },
            setPageSize: {
                type: Object,
                default () {
                    return {}
                }
            },
            lineTop: {
                type: Array,
                default () {
                    return [{
                        left: 50,
                        value: 0
                    }] //数据格式[{left:'',value:''}]
                }
            },
            lineLeft: {
                type: Array,
                default () {
                    return [{
                        left: 50,
                        value: 0
                    }] //数据格式[{left:'',value:''}]
                }
            },
            rulerBackground: {
                type: String,
                default () {
                    return '#212E42' //标尺背景色
                }
            },
            rulerColor: {
                type: String,
                default () {
                    return '#8092b0' //刻度值颜色
                }
            },
            rulerScaleColor: {
                type: String,
                default () {
                    return '#535F77' //刻度长
                }
            },
            rulerShortScaleColor: {
                type: String,
                default () {
                    return '#535F77' //刻度短
                }
            },
            lineColor: {
                type: String,
                default () {
                    return '#2483ff' //刻度短
                }
            }
        },
        directives: {
            drag:{
                inserted: function(el, binding, vnode) {
                    // console.log(el)
                    el.onmousedown = function(e) {
                        // console.log(e)
                    // if(e.target.id == 'drag'){
                        let targetElement = e;
                        let _this = vnode.context
                        let scrollW = _this.$refs['ruler-panel'].scrollWidth
                        let scrollH = _this.$refs['ruler-panel'].scrollHeight
                        let clientWidth = _this.$refs['ruler-panel'].clientWidth
                        let clientHeight = _this.$refs['ruler-panel'].clientHeight
                        let sX = (scrollW - clientWidth)/(targetElement.target.parentElement.offsetWidth - targetElement.target.offsetWidth);
                        let sY = (scrollH - clientHeight)/(targetElement.target.parentElement.offsetHeight - targetElement.target.offsetHeight);
                        var disx = targetElement.clientX - targetElement.target.offsetLeft;
                        var disy = targetElement.clientY - targetElement.target.offsetTop;
                        var disW = _this.$refs.ScaleSketchMap.getBoundingClientRect().width - targetElement.target.getBoundingClientRect().width;
                        var disH = _this.$refs.ScaleSketchMap.getBoundingClientRect().height - targetElement.target.getBoundingClientRect().height;
                        document.onmousemove = function(e) {
                            let X = e.clientX - disx;
                            let Y = e.clientY - disy;
                            if (X < 0) { //屏幕x限制
                                X = 0;
                            } else if (X>disW) {
                                X = disW;
                            }
                            if (Y < 0) { //屏幕y限制
                                Y = 0;
                            } else if (Y>disH) {
                                Y = disH;
                            }
                            targetElement.target.style.left = X + "px";
                            targetElement.target.style.top = Y + "px";
                            _this.$refs['ruler-panel'].scrollTo(X*sX,Y*sY)
                            try {
                                e.stopPropagation(); //非IE浏览器
                            } catch (e) {
                                window.event.cancelBubble = true; //IE浏览器
                            }
                        };
                        document.onmouseleave = function(e) {
                            document.onmousemove = null;
                            try {
                                e.stopPropagation(); //非IE浏览器
                            } catch (e) {
                                window.event.cancelBubble = true; //IE浏览器
                            }
                            e.preventDefault();
                            
                        };
                    document.onmouseup = function(e) {
                    document.onmouseup = document.onmousemove = null;
                    try {
                        e.stopPropagation(); //非IE浏览器
                    } catch (e) {
                        window.event.cancelBubble = true; //IE浏览器
                    }
                    };
                    e.preventDefault();
                };
                }
            }
        },
        data() {
            return {
                $P_page_size: {},
                activeUUid:"",
                pageSize: {                    
                    width: 1920,
                    height: 1080,
                    backgroundColor: '#fff',
                    backgroundImage: null,
                    scale: 0.6,
                    rotate:0,
                    transform: null                        
                },
                isSketchMap:true,
                timer: null,
                wheelLength: 0,
                wheelTarget: 0,
                RULER_REPAIR_SIZE: 50,
                RULER_REPAIR_SIZE_TEXT: 10,
                RULER_SCALE_SHORT: 32, //刻度短 
                RULER_HEIGHT: 40,
                RULER_REPAIR_SIZE_WIDTH: 0,
                RULER_REPAIR_SIZE_HEIGHT: 0,
                INDICATOR_LEFT: 0, //辅助线left
                INDICATOR_NUM: 0, //辅助线标尺值,
                GuideLineShow: false,
                INDICATOR_SHOW: false,
                INDICATOR_LEFT_SHOW: false,
                INDICATOR_LINE_ALL_SHOW: true,
                INDICATOR_LINE_TOP: [],
                INDICATOR_LINE_LEFT: [],
                DIFFERENCE_VALUE: { //缩放画布差值
                    left: 0,
                    top: 0
                },
                POSITION: {
                    left: 82,
                    top: 25
                },
                // CANVAS_PAGE_SIZE:null,
                ZOOM_RATIO: 60,
                SCALE_VALUE: 0.6,
                scrollTop: 0,
                scrollLeft: 0,
                styleType: {
                    px: ['width', 'height', 'top', 'left', 'right', 'bottom', 'fontSize'],
                    url: ['backgroundImage'],
                    scale: ['transform']
                },
                navigatorLine: {
                    x: 0,
                    y: 0,
                    valueX: 0,
                    valueY: 0
                },
                keyCode: {
                    starCode: 0,
                    toCode: 0,
                    endCode: 0,
                    flag: true,
                },
                copyComponents: [],
                shiftComponents: [],
                RECORD_INDEX: 0,
                RECORD_CURRENT: 0,
                recordPosition: {
                    x: 0,
                    y: 0,
                    w: 0,
                    h: 0,
                },
                /**
                 * 试图高度
                 */
                viewWidth: 0,
                viewHeight: 0,
                /**
                 * canvas画布尺寸
                 */
                canvasWidth: 0,
                canvasHeight: 0
            }
        },
        computed: {
            comStyle:function(){
                // this.pageSize = Object.assign({},this.pageSize,this.setPageSize);
                return {...this.getCommonStyle(this.pageSize)}
            }            
        },
        mounted() {
            this.$nextTick(()=>{
                this.pageSize = {...this.pageSize,...this.setPageSize}
                this.CanvasInit(this.pageSize);
                document.getElementById('ruler-canvas-panel').addEventListener('mousewheel', this.scrollFunc, false);
                this.$refs['ruler-panel'].addEventListener('scroll', this.handleScroll, true)
                // this.$refs['ruler-panel'].addEventListener('scroll', this.handleScroll, true)
            })
            
        },
        methods: {
            activated(item,index){
                this.activeUUid = true
                // console.log(item)
                this.$C.setFocus([item.base.uuid]);
            },
            deactivated(item){
                this.activeUUid = false
            },
            getCommonStyle(styleObj, scalingRatio = 1) {
                let needUnitStr = ['width', 'height','top', 'left', 'paddingTop', 'paddingLeft', 'paddingRight', 'paddingBottom', 'marginTop', 'marginLeft', 'marginRight', 'marginBottom', 'borderWidth','fontSize', 'borderRadius', 'letterSpacing']
                let style ={}

                for (let key in styleObj){
                    if(needUnitStr.includes(key)){
                        style[key] = (styleObj[key] * scalingRatio) + 'px'
                    }else{
                        style[key] = styleObj[key]
                    }
                }
                style.transform = `rotate(${style.rotate}deg) scale(${style.scale}) translate(-50%, -50%)`
                style.backgroundImage = style.backgroundImage ? `url(${style.backgroundImage})` : '';
                return style;
            },
             //监听滚动
            handleScroll(event) {
                // console.log(event)
                // event.target.id == 'ruler-canvas-scroll' ? 
                if (this.scroll && event.target.id == 'ruler-canvas-scroll') {
                    // let scrollBottom =
                    //     event.target.scrollWidth -
                    //     event.target.scrollLeft -
                    //     event.target.clientWidth;
                    // console.log(event)
                    // console.log(event.target.scrollHeight - event.target.scrollTop,event.target.scroll(),'scrollWidth')
                    let canvas_top = document.getElementById('line-top');
                    let canvas_left = document.getElementById('line-left');
                    this.scrollTop = event.target.scrollTop;
                    this.scrollLeft = event.target.scrollLeft;
                    
                    canvas_top.style.cssText = `transform: rotate(0deg) translateX(${-event.target.scrollLeft}px)`
                    canvas_left.style.cssText = `transform: rotate(90deg) translateX(${-event.target.scrollTop}px);`

                } else {
                    return
                }
            },
            /**滚轮事件 */
            scrollFunc(ev){
                // console.log(1)
                let MousemoveActive = document.getElementById('MousemoveActive');
                if(MousemoveActive){
                    MousemoveActive.remove();
                }
                ev = ev || event;  //事件的浏览器兼容性
                var b = true;  //设置鼠标向上还是向下滚动的变量
                let wheelLength = 0;
                if (ev.wheelDelta) {  //如果方法存在说明是非火狐浏览器
                    b = ev.wheelDelta > 0 ? true : false;  //如果大于0为true向上，小于0为false向下
                    wheelLength = Math.abs(ev.wheelDelta);
                } else {
                    b = ev.detail < 0 ? true : false; //火狐浏览器
                    wheelLength = Math.abs(ev.detail);
                }
                
                this.wheelLength += wheelLength;

                if(this.wheelLength - this.wheelTarget >= 100) {
                    this.wheelTarget = this.wheelLength;
                    if ( b ) { //如果滚轮向上
                        this.addSize(this.ZOOM_RATIO)
                    } else {
                        this.removeSize(this.ZOOM_RATIO)    
                    }
                }

                if (ev.preventDefault) { //取消火狐的默认事件
                    ev.preventDefault();
                }
                
                return false;  //取消非火狐的滚轮默认事件
            },
            SliderChange(value) {
                // console.log(value,'mmmmmmmmmmmmmmm')
                this.pageSize.scale = value / 100
                this.CanvasInit(this.pageSize)
                // console.log(this.getSize(),'size')
            },
            addSize(value) {
                this.ZOOM_RATIO = value + 5 >= 200 ? 200 : value + 5
                this.pageSize.scale = this.ZOOM_RATIO / 100
                this.CanvasInit(this.pageSize)
            },
            removeSize(value) {
                this.ZOOM_RATIO = value - 5 <= 10 ? 10 : value - 5
                this.pageSize.scale = this.ZOOM_RATIO / 100
                this.CanvasInit(this.pageSize)
            },
            add() {
                var div = document.createElement("div");
                div.style.width = 300 + 'px';
                div.style.height = 300 + 'px';
                div.style.background = 'yellow'
                this.$refs.content.appendChild(div);
            },
            ResetSize() {

            },
            //缩放比例自定义显示
            format(val) {
                return val + '%';
            },
            //隐藏显示参考线
            indicatopLineAllShow() {
                this.INDICATOR_LINE_ALL_SHOW = !this.INDICATOR_LINE_ALL_SHOW
            },
            //删除参考线
            blclickDel(index, type) {
                clearTimeout(this.timer);
                if (type == 'top') {
                    this.INDICATOR_LINE_TOP.splice(index, 1)
                } else if (type == 'left') {
                    this.INDICATOR_LINE_LEFT.splice(index, 1)
                }
            },
            //按下拖动标尺辅助线
            Mousedown(event, item, index, type) {
                let _this = this
                const ruler_canvas_content_offsetLeft = _this.$refs['ruler-canvas-content'].getBoundingClientRect().left;
                const ruler_canvas_content_offsetTop = _this.$refs['ruler-canvas-content'].getBoundingClientRect().top;

                document.onmousemove = function (ev) {

                    if (type == 'top') {
                        if (ev.clientX < _this.RULER_HEIGHT / 2) {
                            _this.INDICATOR_LINE_TOP.splice(index, 1)
                        } else {
                            item.left = parseInt((ev.clientX + _this.scrollLeft - (_this.RULER_HEIGHT / 2) -
                            ruler_canvas_content_offsetLeft))
                            item.value = parseInt((ev.clientX + _this.scrollLeft - _this.POSITION.left -
                                ruler_canvas_content_offsetLeft) / _this.pageSize.scale)
                        }
                    } else if (type == 'left') {
                        if (ev.clientY < _this.RULER_HEIGHT / 2) {
                            _this.INDICATOR_LINE_LEFT.splice(index, 1)
                        } else {
                            item.left = parseInt((ev.clientY + _this.scrollTop - (_this.RULER_HEIGHT / 2) -
                            ruler_canvas_content_offsetTop))
                            item.value = parseInt((ev.clientY + _this.scrollTop - _this.POSITION.top -
                                ruler_canvas_content_offsetTop) / _this.pageSize.scale)
                        }
                    }
                    ev.preventDefault()
                    ev.stopPropagation();
                }

                document.onmouseup = function () {
                    document.onmousemove = null;
                };
            },
            //鼠标进入移入经过
            Mouseenter(event, type) {
                let _this = this
                const ruler_canvas_content_offsetLeft = _this.$refs['ruler-canvas-content'].getBoundingClientRect().left;
                const ruler_canvas_content_offsetTop = _this.$refs['ruler-canvas-content'].getBoundingClientRect().top;
                event.target.onmousemove = (function (ev) {
                    if (type == 'left') {
                        _this.INDICATOR_LEFT_SHOW = true
                        _this.INDICATOR_NUM = parseInt((ev.clientY + _this.scrollTop - _this.POSITION.top -
                            ruler_canvas_content_offsetTop) / _this.pageSize.scale)

                        _this.INDICATOR_LEFT = ev.clientY + _this.scrollTop - ruler_canvas_content_offsetTop -
                            (_this.RULER_HEIGHT / 2)
                    } else if (type == 'top') {
                        _this.INDICATOR_SHOW = true
                        _this.INDICATOR_NUM = parseInt((ev.clientX + _this.scrollLeft - _this.POSITION.left -
                            ruler_canvas_content_offsetLeft) / _this.pageSize.scale)
                            
                        _this.INDICATOR_LEFT = ev.clientX + _this.scrollLeft - ruler_canvas_content_offsetLeft -
                            (_this.RULER_HEIGHT / 2)
                    }
                })
                event.target.onmouseup = function () {
                    if (type == 'top') {
                        _this.INDICATOR_SHOW = false
                        _this.INDICATOR_LINE_TOP.push({
                            left: _this.INDICATOR_LEFT,
                            value: _this.INDICATOR_NUM
                        })
                    } else if (type == 'left') {
                        _this.INDICATOR_LEFT_SHOW = false
                        _this.INDICATOR_LINE_LEFT.push({
                            left: _this.INDICATOR_LEFT,
                            value: _this.INDICATOR_NUM
                        })
                    }
                    event.target.onmousemove = null;


                }
                event.target.onmouseleave = function () {
                    _this.INDICATOR_SHOW = false
                    _this.INDICATOR_LEFT_SHOW = false
                    event.target.onmousemove = null;
                }
            },
            //标尺开始渲染
            CanvasInit(size) {
                let _this = this
                let ruler_canvas_content_width = this.$refs['ruler-canvas-content'].offsetWidth;
                let ruler_canvas_content_height = this.$refs['ruler-canvas-content'].offsetHeight;
                let canvas_top = document.getElementById('canvas-top');
                let canvas_left = document.getElementById('canvas-left');
                let context_top = canvas_top.getContext("2d");
                let context_left = canvas_left.getContext("2d");
                canvas_top.width = (size.width) * this.pageSize.scale + this.RULER_REPAIR_SIZE <
                    ruler_canvas_content_width ? ruler_canvas_content_width : (size.width) * this.pageSize.scale +
                    this.RULER_REPAIR_SIZE;
                this.RULER_REPAIR_SIZE_WIDTH = canvas_top.width
                canvas_top.height = this.RULER_HEIGHT;

                canvas_left.width = (size.height) * this.pageSize.scale + this.RULER_REPAIR_SIZE <
                    ruler_canvas_content_height ? ruler_canvas_content_height : (size.height) * this.pageSize.scale +
                    this.RULER_REPAIR_SIZE;
                this.RULER_REPAIR_SIZE_HEIGHT = canvas_left.width
                canvas_left.height = this.RULER_HEIGHT;
                canvas_top.style.width = canvas_top.width + 'px';
                canvas_top.style.height = (this.RULER_HEIGHT / 2) + 'px';
                canvas_left.style.width = canvas_left.width + 'px';
                canvas_left.style.height = (this.RULER_HEIGHT / 2) + 'px';
                canvas_top.width *= 2;
                canvas_left.width *= 2;
                /***--------------- */
                this.POSITION.left = parseInt((canvas_top.width/4) - (size.width * this.pageSize.scale)/2)
                this.POSITION.top = parseInt((canvas_left.width/4) - (size.height * this.pageSize.scale)/2)
                
                // console.log(this.POSITION,canvas_top.width/2,(size.width * this.pageSize.scale)/2,'this.POSITION')
                /***------------------ */
                let data = [{
                    canavs: canvas_top,
                    context: context_top,
                    size,
                    type: 'top'
                }, {
                    canavs: canvas_left,
                    context: context_left,
                    size,
                    type: 'left'
                }]
                data.forEach(item => {
                    this.DrawingScale(item.canavs, item.context, item.size, item.type)
                })

                this.$nextTick(() => {
                    
                    this.Guide(this.navigatorLine.valueX, this.navigatorLine.valueY)
                    // const canvas_content_size = this.$refs['ruler-canvas-panel'].$el.getBoundingClientRect();
                    
                    // let data = []
                    this.INDICATOR_LINE_TOP.forEach(val => {
                        let left = val.value * this.pageSize.scale + _this.POSITION.left - (this
                            .RULER_HEIGHT / 2)
                        val.left = left

                    })
                    this.INDICATOR_LINE_LEFT.forEach(val => {
                        let left = val.value * this.pageSize.scale + _this.POSITION.top - (this
                            .RULER_HEIGHT / 2)
                        val.left = left
                    })
                    /**
                     * @计算小地图尺寸
                     * 
                     * 获取dom
                     */
                    let rulerCanvasScroll = document.getElementById('ruler-canvas-scroll');
                    let rulerCanvasPanel = document.getElementById('ruler-canvas-panel');
                    let canvasSelectSpan = document.getElementsByClassName('canvas-select-span')[0];
                    let canvasSketchMap = document.getElementsByClassName('canvas-sketch-map')[0];
                    let canvasContent = document.getElementsByClassName('canvas-content')[0];
                    /**
                     * 获取视图尺寸
                     */
                    
                    this.viewWidth = rulerCanvasScroll.offsetWidth  - 50;
                    this.viewHeight = rulerCanvasScroll.offsetHeight - 50;
                    /**
                     * 获取画布尺寸
                     */
                    this.canvasWidth = rulerCanvasPanel.offsetWidth * this.pageSize.scale;
                    this.canvasHeight = rulerCanvasPanel.offsetHeight * this.pageSize.scale;
                    /**
                     * 比例计算
                     */
                    let canvasWh = this.canvasWidth / this.canvasHeight; // 画布宽高比
                    let sketchWW = this.viewWidth / this.canvasWidth; // 显示区和画布宽比(小地图蓝框缩小和放大程度)
                    let sketchHH = this.viewHeight / this.canvasHeight; // 显示区和画布高比(小地图蓝框缩小和放大程度)
                    let miniMapViewWidth = 150 * sketchWW;
                    miniMapViewWidth = miniMapViewWidth > 150 ? 150 : miniMapViewWidth;
                    let miniMapHeight = 150 / canvasWh;
                    let miniMapViewHeight = miniMapHeight * sketchHH;
                    /**
                     * 修改小地图蓝框尺寸,由于小地图限制宽度固定150
                     * 150 / 蓝框宽度 = 画布宽度 / 可视区域宽度
                     */
                    canvasSketchMap.style.height = miniMapHeight + 'px';
                    canvasSelectSpan.style.width = miniMapViewWidth + 'px';
                    canvasSelectSpan.style.height = (miniMapViewHeight > miniMapHeight ? miniMapHeight : miniMapViewHeight) + 'px';
                    /**
                     * 计算小地图top 百分比
                     */
                    canvasSelectSpan.style.top = (rulerCanvasScroll.scrollTop / canvasContent.offsetHeight) * 100 + '%';
                    canvasSelectSpan.style.left = (rulerCanvasScroll.scrollLeft / canvasContent.offsetWidth) * 100 + '%';

                })
            },
            //绘制刻度
            DrawingScale(canvas, context, size, type) {
                
                let star = type == 'top' ? this.POSITION.left - (this.RULER_HEIGHT / 2) : this.POSITION.top - (this.RULER_HEIGHT / 2);
                star *= 2;
                let width = canvas.width
                let double = this.pageSize.scale <= '0.3' ? '5' : '1';
                for (var i = -star; i < width; ++i) {
                    context.beginPath();
                    if (i % (320 * double * this.pageSize.scale) === 0) {
                        context.moveTo(i + star, 0);
                        context.lineTo(i + star, this.RULER_HEIGHT)
                        context.lineWidth = 1
                        context.strokeStyle = this.rulerScaleColor;
                        context.font = "24px Arial";
                        context.fillStyle = this.rulerColor;
                        context.fillText((parseInt(i / this.pageSize.scale) / 2), i + star + this.RULER_REPAIR_SIZE_TEXT,
                            this.RULER_HEIGHT / 1.5);
                    } else if (i % (160 * double * this.pageSize.scale) === 0) {
                        context.moveTo(i + star, this.RULER_HEIGHT / 2);
                        context.lineTo(i + star, this.RULER_HEIGHT)
                        context.lineWidth = 1
                        context.strokeStyle = this.rulerScaleColor
                        context.font = "24px Arial";
                        context.fillStyle = this.rulerColor;
                        context.fillText((parseInt(i / this.pageSize.scale) / 2), i + star + this.RULER_REPAIR_SIZE_TEXT,
                            this.RULER_HEIGHT / 1.5);
                    } else if (i % (20 * double * this.pageSize.scale) === 0) {
                        context.moveTo(i + star, this.RULER_HEIGHT);
                        context.lineTo(i + star, this.RULER_SCALE_SHORT)
                        context.lineWidth = 1
                        context.strokeStyle = this.rulerShortScaleColor
                    }
                    
                    context.stroke();
                    context.closePath();
                }
            },
            Guide(x, y) {
                this.navigatorLine.x = x != null ? x * this.pageSize.scale + this.POSITION.left : this.navigatorLine
                    .x
                this.navigatorLine.y = y != null ? y * this.pageSize.scale + this.POSITION.top : this.navigatorLine.y
                this.navigatorLine.valueX = x != null ? parseInt(x * this.pageSize.scale / this.pageSize.scale) :
                    this.navigatorLine.valueX;
                this.navigatorLine.valueY = y != null ? parseInt(y * this.pageSize.scale / this.pageSize.scale) :
                    this.navigatorLine.valueY;
            },
            /**
             * 获取元素offsetLeft，offsetTop
             * @param {目标元素} el 
             * @param {层级，默认body} pname
             */
            getOffset(el, pname = 'body'){
                let left = el.getBoundingClientRect().left;
                let top = el.getBoundingClientRect().top;
                return {left, top};
            },
            mousedown(event){
                let box = document.getElementById('canvas-box');
                if(!(event.target.id == 'canvas-box' || event.target.id == 'page')) return;
                event.preventDefault();
                let div = document.getElementById('MousemoveActive');
                let scrollElement = document.getElementById('ruler-canvas-scroll');
                let offset = this.getOffset(box);
                
                let startX = event.clientX - offset.left + scrollElement.scrollLeft;
                let startY = event.clientY - offset.top + scrollElement.scrollTop;
                /**
                 * 当前画布缩放比例
                 */
                let scale = this.pageSize.scale;
                let canvasW = parseInt(this.pageSize.width);
                let canvasH = parseInt(this.pageSize.height);

                startX /= scale;
                startY /= scale;

                if(!div){
                    div = document.createElement("div");
                    div.id = 'MousemoveActive';
                    div.style.left = startX + "px";
                    div.style.top = startY + "px";
                    div.style.border =  `1px dashed #fff`;
                    div.style.width = `0px`;
                    div.style.height = `0px`;
                    div.style.position = `absolute`;
                    box.appendChild(div);
                }

                /**
                 * 防止停用开启
                 */
                // this.components.map(item => {
                //     item._props.deactive = true;
                // })
                
                document.onmousemove = (ev) => {
                    ev.preventDefault();
                    let mouseLeft = (ev.clientX - offset.left + scrollElement.scrollLeft) / scale;
                    let mouseTop = (ev.clientY - offset.top + scrollElement.scrollTop) / scale;
                    let selected = {
                        lt: [0, 0],
                        rb: [0, 0]
                    }
                    /**
                     * 溢出限制
                     */
                    mouseLeft = mouseLeft <= 0 ? 0 : mouseLeft >= canvasW ? canvasW : mouseLeft;
                    mouseTop = mouseTop <= 0 ? 0 : mouseTop >= canvasH ? canvasH : mouseTop;

                    if(mouseLeft < startX) {
                        div.style.width = startX - mouseLeft + 'px';
                        div.style.left = mouseLeft + 'px';
                        selected.lt[0] = mouseLeft;
                        selected.rb[0] = startX;
                    }else {
                        div.style.width = mouseLeft - startX + 'px';
                        div.style.left = startX + 'px';
                        selected.lt[0] = startX;
                        selected.rb[0] = mouseLeft;
                    }

                    if(mouseTop < startY) {
                        div.style.height = startY - mouseTop + 'px';
                        div.style.top = mouseTop + 'px';
                        selected.lt[1] = mouseTop;
                        selected.rb[1] = startY;
                    }else {
                        div.style.height = mouseTop - startY + 'px';
                        div.style.top = startY + 'px';
                        selected.lt[1] = startY;
                        selected.rb[1] = mouseTop;
                    }
                    /**
                     * 碰撞检测
                     */
                    // if(this.components.length){
                    //     this.components.map(item => {
                    //         if(
                    //             (   // 左上角 对比组件右下角
                    //                 selected.lt[0] < (item._props.basics.left + item._props.basics.width) &&
                    //                 selected.lt[1] < (item._props.basics.top + item._props.basics.height)
                    //             ) &&
                    //             (   // 右下角 对比组件左上角
                    //                 selected.rb[0] > item._props.basics.left &&
                    //                 selected.rb[1] > item._props.basics.top
                    //             )
                    //         ){
                    //             this.$emit('setShiftComponents', item, true);
                    //         }else {
                    //             this.$emit('setShiftComponents', item, false);
                    //         }
                    //         return item;
                    //     })
                    // }
                }
                document.onmouseup = (ev) => {
                    const endLeft = ev.clientX
                    const endTop = ev.clientY
                    div.remove()
                    this.activeUUid = false
                    // this.activeUUid
                    document.onmousemove = null;
                    document.onmouseup = null;
                    /**
                     * 防止停用关闭
                     */
                    // this.components.map(item => {
                    //     item._props.deactive = false;
                    // })
                    // console.log('starLeft',starLeft,'starTop',starTop,'endleft',endLeft,'endtop',endTop)
                }
                
            }
        },
        watch: {
            pageSize: {
                handler: function (val) {
                    // this.ZOOM_RATIO = parseInt(val.scale * 100)
                    this.CanvasInit(val)
                },
                deep: true
            },
        },
        beforeDestroy () {
            // window.removeEventListener('keydown', this.keydownCode,true)
            this.$refs['ruler-panel'].removeEventListener('scroll', this.handleScroll)
            if(!document.getElementById('ruler-canvas-panel')) return;
            document.getElementById('ruler-canvas-panel').removeEventListener('mousewheel', this.scrollFunc, false);
            
        },


    }
</script>

<style lang="less" scoped>
    #MousemoveActive {
        border: 1px dashed #fff;
        width: 0px;
        height: 0px;
        position: absolute;
    }

    .ruler-canvas-content {
        flex: 1;
        position: relative;
        overflow: hidden;
        flex-direction: column;
        height: 500px;
        
        .canvas-content-panel {
            flex: 1;
            width: 100%;
            height: 100%;
            position: relative;
            overflow: auto;
            .canvas-content {
                position: relative;
            }
        }

        .canvas-content-panel::-webkit-scrollbar {
            width: 4px;
            height: 4px;
        }

        .canvas-content-panel::-webkit-scrollbar-thumb {
            background: #434b55;
            border: 1px solid #434b55;
        }

        .canvas-content-panel::-webkit-scrollbar-track {
            background: #1c222b;
        }
    }


    /**标尺 */
    .ruler-components {
        position: fixed;
        z-index: 1;
        .ruler-canvas-content {
            position: absolute;
            left: 120px;
            top: 120px;
            background: red;
        }
        #line-left {
            position: absolute;
            height: 20PX;
            transform-origin: 0 100% 0;
            transform: rotate(90deg) translateY(0px);
            cursor: n-resize;

            .indicator-line-content,
            .indicator-dashed-left {
                transform: rotate(-90deg);
                transform-origin: 0 100% 0;
            }
        }

        #line-top {
            position: absolute;
            left: 20PX;
            height: 20PX;
            transform: rotate(0deg) translateX(0px);
            cursor: e-resize;
        }
        #canvas-left {
            cursor: n-resize;
        }

        #canvas-top {
            cursor: e-resize;
        }
        .corner {
            border-right: 1px solid #3a4659;
            border-bottom: 1px solid #3a4659;
            width: 20PX;
            height: 20PX;
            font-size: 16PX;
            cursor: pointer;
            position: fixed;
            z-index: 999;
            align-items: center;
            justify-content: center;
            display: flex;
            color: #bcc9d4;
        }

    }

    //辅助线

    .indicator-dashed-top {
        border-left: 1px dashed #2483ff;
        top: 0;
        cursor: e-resize;
    }

    .indicator-dashed-left {
        border-top: 1px dashed #2483ff;
        left: 0;
        cursor: n-resize;
    }

    .indicator-dashed {
        pointer-events: none;
        position: absolute;

        z-index: 99;
    }

    /**----------------- */
    .indicator-solid {
        position: absolute;
        z-index: 99;
    }

    .indicator-solid-top {
        padding-left: 5px;
        border-left: 1px solid #2483ff;
        top: 0;
        cursor: e-resize;
    }

    .indicator-solid-left {
        padding-top: 5px;
        border-top: 1px solid #2483ff;
        left: 0;
        cursor: n-resize;
    }

    .indicator-hover,
    .indicator-action {
        position: absolute;
        display: flex;
        justify-content: center;
        align-items: center;
        user-select: none;
        color: #fff;
        padding: 0 4px;
        border-radius: 1px;
        box-shadow: 0 0 5px -3px #000;
        background: #4074b4;
        margin-left: 10px;
        z-index: 1;

    }

    .line-value {
        pointer-events: none;
    }

    //选中辅助线
    .navigator-line {
        // width: 100%;
        // height: 100%;
        position: absolute;
        pointer-events: none;
        box-sizing: content-box;
        z-index: 1;
    }

    .navigator-line .navigator-line-top {
        position: absolute;
        border-left: 1px dashed #2483ff;
    }

    .navigator-line .navigator-line-left {
        position: absolute;
        border-top: 1px dashed #2483ff;
    }

    .navigator-line .navigator-line-value {
        position: absolute;
        color: #2483ff;
    }

    //缩放比例
    /deep/.ruler-slider {
        position: absolute;
        bottom: 10px;
        right: 10px;
        height: 30px;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        user-select: none;
        z-index: 99;

        .slide-size {
            width: 300px;
            margin-left: 5px;
        }

        .ruler-slider-icon {
            font-size: 24px;
            cursor: pointer;
        }

        .ivu-slider-input .ivu-input-number {
            margin-top: -10px;
            border-color: #676767;
        }

        .ivu-input-number-inpu,
        .ivu-input-number,
        .ivu-input-number-handler-wrap,
        input {
            background-color: transparent !important;
            background: transparent !important;
        }

        .ivu-input-number-handler-down,
        .ivu-input-number-handler-wrap {
            border: 0;
        }

        .ivu-input-number-handler-down-inner,
        .ivu-input-number-handler-up-inner {
            color: #fff
        }

        .ivu-input-number-handler-up-inne {
            color: #fff;
        }
    }
    /**  画布略缩图 */
    .canvas-sketch-map {
        position: absolute;
        width: 150PX;
        height: 80PX;
        background-color: rgba(0, 0, 0, 0.7);
        bottom:50PX;
        right: 20PX;
        .canvas-select-content{
            position: relative;
            width: 100%;
            height: 100%;
            .canvas-select-span{
                position: absolute;
                top: 0;
                left: 0;
                width: 60PX;
                height: 60PX;
                box-sizing: border-box;
                border: 1px solid #2483ff;
                box-shadow: 0 0 30PX 0 #000;
                cursor: move;
            }
        }
    }
    .ScaleSketchMap-enter, .ScaleSketchMap-leave-to {
      transform-origin:100% 100%;
      transform: scale(0);
    }
    .ScaleSketchMap-leave, .ScaleSketchMap-enter-to {
      
      transform-origin:100% 100%;
      transform: scale(1)
    }
    .ScaleSketchMap-enter-active, .ScaleSketchMap-leave-active {
      transition: .3s transform cubic-bezier(.22,.61,.36,1);
    }

    //画板
        .ruler-canvas-panel{
            position: absolute;
            transform-origin: 0 0;
            background-size: cover,contain;
            background-position: center,right bottom;
            background-repeat: no-repeat,no-repeat;
            box-shadow: rgba(0,0,0,.5) 0 0 30px 0;
            top:50%;
            left:50%;
            .ruler-canvas-panel-box{
                width: 100%;
                height: 100%;
                position: relative;
                overflow: hidden;
                font-size: 0px;
                text-align: left;
                overflow: auto;
            }
        }
        .gridBack{
            background:linear-gradient(-90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px) 0% 0% / 10px 10px, linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px) 0% 0% / 10px 10px;
        }
</style>