export default {
    props: ['message'],

    template: `
    <article class="sent">
        <h4 class="sender">{{message.message.name}}</h4>
        <p class="messageSent">{{message.message.content}}</p>
        <p>01:01</p>
    </article>
    `
}