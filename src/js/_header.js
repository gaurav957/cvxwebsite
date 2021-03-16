Vue.component('cvex_header', {
    props:['JsonData'],
    template:`<div class="cvex-conatiner">
    <div class="intro-nav">
        <div class="brand-inner clearfix">
            <div class="mck-brand">
                <img width="150" height="48" :src="JsonData.headerData.logo" alt="Mckinsey" title="Mckinsey">
            </div>
        </div>
    </div>
</div>`
})