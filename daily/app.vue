<template>
    <div class="daily">
        <div class="daily-menu">
            <div class="daily-menu-item"
                @click="handleToRecommend"
                :class="{ on: type === 'recommend'}">每日推荐</div>
            <div class="daily-menu-item"
                :class="{ on: type === 'daily'}"
                @click="showThemes = !showThemes">主题日报</div>
            <ul v-show="showThemes">
                <li v-for="item in themes">
                    <a href="" :class="{on: item.id === themeId && type === 'daily'}">
                        {{ item.name }}
                    </a>
                </li>
            </ul>
        </div>
        <div class="daily-list">
            <Item v-for="item in list.stories" :data="item" :key="item.id"></Item>
        </div>
        <div class="daily-article"></div>
    </div>
</template>
<script>
    import vTitle from './title.vue';
    import vButton from './button.vue';
    import Item from './item.vue'
    import $ from './libs/utils';

    export default {
        data () {
            return {
                list:[],
                themes: [],
                showThemes: false,
                type: 'recommend',
                themeId: 0,
                dailyTime: $.getTodayTime(),
                articleId: 0,
                isLoading: false,
                recommendList: [],
            }
        },
        components: {
            vTitle,
            vButton,
            Item
        },
        methods: {
            getThemes(){
                $.ajax.get('http://127.0.0.1:8010/themes').then(res => {
                    console.log(res);
                    this.themes = res.others;
                })
            },
            handleToTheme (id) {
                //改变菜单分类 
                this.type = 'daily';
                //设置当前点击子类的主题日报的id
                this.themeId = id;
                //清空中间栏的数据
                this.list = [];
                $.ajax.get('http://127.0.0.1:8010/thmem/ + id').then(res => {
                    //过滤掉类型为1的文章，该类型下的文章为空
                    this.list = res.stories.filter(item => item.type !== 1);
                })
            },
            handleToRecommend () {
                this.type = 'recommend';
                this.recommendList = [];
                this.dailyTime = $.getTodayTime();
                this.getRecommendList();
            },
            getRecommendList () {
                this.isLoading = true;
                const prevDay = $.prevDay(this.dailyTime + 86400000);
                $.ajax.get('http://127.0.0.1:8010/news/before/' + prevDay).then(res => {
                    this.recommendList.push(res);
                    this.isLoading = false;
                })
            }
        },
        mounted () {
            this.getThemes();
        }
    }
</script>
<style scoped>

</style>
