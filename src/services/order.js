class Order {
    constructor(order) {
        this.id = order.id
        this.side = order.side
        this.amount = order.amount
        this.tokenId = order.tokenId
        this.payment = order.paymentTermList[0]
        this.firstname = order.targetFirstName
        this.secondname = order.targetSecondName
    }

    get #type() {
        return ['buy', 'sell'][this.side]
    }

    get username() {
        return `${this.firstname.slice(0, 1)}${this.firstname.slice(1).toLowerCase()} ${this.secondname[0]}`
    }

    get #orderInfo() {
        return `[bybit ${this.#type} ${this.tokenId}](https://www.bybit.com/fiat/trade/otc/orderList/${this.id}) | ${this.username} | \`${this.amount}\``
    }

    get #cardInfo() {
        return `Tinkoff - *${this.payment.realName || 'Имя не указано'}*\n\`${this.payment.accountNo}\``
    }

    get text() {
        return `${this.#orderInfo}${!this.side ? `\n\n${this.#cardInfo}` : ''}`
    }
}

module.exports = Order