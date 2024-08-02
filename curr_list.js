const {currency} =  require("./models/models.js")

const list = [
    {shortName: "SBERRUB", FullName: "Сбербанк RUB", Icon: "https://sova.gg/media/pslogo/sber_upd_8ac4Mov.png", Type: "RUB", reserv: 0, currency: "rub"},
    {shortName: "BTC", FullName: "Bitcoin", Icon: "https://sova.gg/media/pslogo/btc_upd_aLWCRUT.png", Type: "Coin", reserv: 0, currency: "btc"},
    {shortName: "SBPRUB", FullName: "СБП", Icon: "https://sova.gg/media/pslogo/sbp_icon_5y6fP31.svg", Type: "RUB", reserv: 0, currency: "rub"},
    {shortName: "MIRCRUB", FullName: "МИР", Icon: "https://sova.gg/media/pslogo/mir_EFJ8rAg.svg", Type: "RUB", reserv: 0, currency: "rub"},
    {shortName: "CARDRUB", FullName: "Visa/MC rub", Icon: "https://sova.gg/media/pslogo/visamc_kaPE1uZ_blVtnhQ.svg", Type: "RUB", reserv: 0, currency: "rub"},
    {shortName: "TCSBRUB", FullName: "Тинькофф", Icon: "https://sova.gg/media/pslogo/tinkoff_upd_4ylXqDp.svg", Type: "RUB", reserv: 0, currency: "rub"},
    {shortName: "TBRUB", FullName: "ВТБ", Icon: "https://sova.gg/media/pslogo/vtb_icon_ONIgVjk.svg", Type: "RUB", reserv: 0, currency: "rub"},
    {shortName: "ACRUB", FullName: "Альфа банк", Icon: "https://sova.gg/media/pslogo/alfa_upd_g2MLrUc.svg", Type: "RUB", reserv: 0, currency: "rub"},
    {shortName: "OPNBRUB", FullName: "Открытие", Icon: "https://sova.gg/media/pslogo/otkrytie_logo_ptDQlGh.png", Type: "RUB", reserv: 0, currency: "rub"},
    {shortName: "HCBRUB", FullName: "Хоум Кредит", Icon: "https://sova.gg/media/pslogo/homecredit_kY0ACn8.svg", Type: "RUB", reserv: 0, currency: "rub"},
    {shortName: "ROSBRUB", FullName: "РосБанк", Icon: "https://sova.gg/media/pslogo/rosbank_logo_jJCaWyS.png", Type: "RUB", reserv: 0, currency: "rub"},
    {shortName: "GPBRUB", FullName: "Газпромбанк", Icon: "https://sova.gg/media/pslogo/gazprombank_3BKxmI5.svg", Type: "RUB", reserv: 0, currency: "rub"},
    {shortName: "MTSBRUB", FullName: "МТС банк", Icon: "https://sova.gg/media/pslogo/mtsbank_7ksHout_NwwfTyn.png", Type: "RUB", reserv: 0, currency: "rub"},
    {shortName: "POSTBRUB", FullName: "Почта банк", Icon: "https://sova.gg/media/pslogo/pochta_bank_zJVN4Jr_XSmxWT2.png", Type: "RUB", reserv: 0, currency: "rub"},
    {shortName: "RUSSTRUB", FullName: "Русский стандарт", Icon: "https://sova.gg/media/pslogo/rsb_pX5VPtq.svg", Type: "RUB", reserv: 0, currency: "rub"},
    {shortName: "RFBRUB", FullName: "Райффайзенбанк", Icon: "https://sova.gg/media/pslogo/raiffeisenbank_MzZJqI8.svg", Type: "RUB", reserv: 0, currency: "rub"},
    {shortName: "RSHBRUB", FullName: "Россельхозбанк", Icon: "https://sova.gg/media/pslogo/rosselhozbank_GDjmJEe.svg", Type: "RUB", reserv: 0, currency: "rub"},
    {shortName: "AVBRUB", FullName: "Авангард", Icon: "https://sova.gg/media/pslogo/bank_avangard_Rh4MTKu.svg", Type: "RUB", reserv: 0, currency: "rub"},
    {shortName: "PSBRUB", FullName: "Промсвязьбанк", Icon: "https://sova.gg/media/pslogo/psbank_pmOn6Dr.svg", Type: "RUB", reserv: 0, currency: "rub"},
    {shortName: "RNKBRUB", FullName: "РНКБ", Icon: "https://sova.gg/media/pslogo/rncb_rur_YCIvWDp.svg", Type: "RUB", reserv: 0, currency: "rub"},
    {shortName: "YAMRUB", FullName: "ЮMoney (Я.Деньги)", Icon: "https://sova.gg/media/pslogo/u_money_3g3UZYQ.svg", Type: "RUB", reserv: 0, currency: "rub"},
    {shortName: "KSPBKZT", FullName: "Kaspi Bank", Icon: "https://sova.gg/media/pslogo/kaspibank_icon_KjtnuIp.svg", Type: "KZT", reserv: 0, currency: "kzt"},
    {shortName: "HLKBKZT", FullName: "Halyk Bank", Icon: "https://sova.gg/media/pslogo/halykbank_CTtA281.svg", Type: "KZT", reserv: 0, currency: "kzt"},
    {shortName: "CARDKZT", FullName: "Visa/MC kzt", Icon: "https://sova.gg/media/pslogo/visamastercard_eur_xJ5mWJM.svg", Type: "KZT", reserv: 0, currency: "kzt"},
    {shortName: "JSNBKZT", FullName: "Jusan Bank", Icon: "https://sova.gg/media/pslogo/jysanbank_tn62gb2.svg", Type: "KZT", reserv: 0, currency: "kzt"},
    {shortName: "FRTBKZT", FullName: "Forte Bank", Icon: "https://sova.gg/media/pslogo/fortebank_W3Gm7yi.svg", Type: "KZT", reserv: 0, currency: "kzt"},
    {shortName: "FFBKZT", FullName: "Фридом Банк KZT", Icon: "https://sova.gg/media/pslogo/1-3_FF.svg", Type: "KZT", reserv: 0, currency: "kzt"},
    {shortName: "ERSNBKZT", FullName: "Евразийский банк KZT", Icon: "https://sova.gg/media/pslogo/1-3_eurz.svg", Type: "KZT", reserv: 0, currency: "kzt"},
    {shortName: "BRBKZT", FullName: "Bereke Bank KZT", Icon: "https://sova.gg/media/pslogo/1-3_BEREKE_orBgdgU.svg", Type: "KZT", reserv: 0, currency: "kzt"},
    {shortName: "CCBKZT", FullName: "ЦентрКредит KZT", Icon: "https://sova.gg/media/pslogo/1-3_bcc.svg", Type: "KZT", reserv: 0, currency: "kzt"},
    {shortName: "HUMOUZS", FullName: "Карта HUMO UZS", Icon: "https://sova.gg/media/pslogo/11111111111111111111_jwNCIqQ.png", Type: "UZS", reserv: 0, currency: "uzs"},
    {shortName: "CARDUZS", FullName: "Visa/MC uzs", Icon: "https://sova.gg/media/pslogo/visamastercardsvg_kO3Wxif.svg", Type: "Coin", reserv: 0, currency: "uzs"},
    {shortName: "PRRUB", FullName: "Payeer RUB", Icon: "https://sova.gg/media/pslogo/payeer_vYkvy7Y_ryW3ovY.svg", Type: "RUB", reserv: 0, currency: "rub"},
    {shortName: "PRUSD", FullName: "Payeer USD", Icon: "https://sova.gg/media/pslogo/payeer_vYkvy7Y_QFkyMHw.svg", Type: "USD", reserv: 0, currency: "usd"},
    {shortName: "PREUR", FullName: "Payeer EUR", Icon: "https://sova.gg/media/pslogo/payeer_vYkvy7Y_J3dQQYU.svg", Type: "EUR", reserv: 0, currency: "eur"},
    {shortName: "PMUSD", FullName: "Perfect Money USD", Icon: "https://sova.gg/media/pslogo/perfectmoney_Pr3fU1S.svg", Type: "USD", reserv: 0, currency: "usd"},
    {shortName: "PMEUR", FullName: "Perfect Money EUR", Icon: "https://sova.gg/media/pslogo/perfectmoney_euro_Af6W1Yy.svg", Type: "EUR", reserv: 0, currency: "eur"},
    {shortName: "USDTTRC20", FullName: "Tether TRC20", Icon: "https://sova.gg/media/pslogo/tether_svg_T1bcWwm.svg", Type: "Coin", reserv: 0, currency: "usdt"},
    {shortName: "USDTSOL", FullName: "Tether SOL", Icon: "https://sova.gg/media/pslogo/tether_bep20_v2AYCF6.svg", Type: "Coin", reserv: 0, currency: "usdt"},
    {shortName: "USDTBEP20", FullName: "Tether BEP20", Icon: "https://sova.gg/media/pslogo/tether_bep20_AUWZkLC.svg", Type: "Coin", reserv: 0, currency: "usdt"},
    {shortName: "USDTERC20", FullName: "Tether ERC20", Icon: "https://sova.gg/media/pslogo/tether_svg_VY8DKxO.svg", Type: "Coin", reserv: 0, currency: "usdt"},
    {shortName: "USDTTON", FullName: "Tether TON", Icon: "https://sova.gg/media/pslogo/tether_XO7ExQT.svg", Type: "Coin", reserv: 0, currency: "usdt"},
    {shortName: "ETH", FullName: "Ethereum", Icon: "https://sova.gg/media/pslogo/eth_jDKKTjh.png", Type: "Coin", reserv: 0, currency: "eth"},
    {shortName: "ETHBEP20", FullName: "Ethereum (BEP20)", Icon: "https://sova.gg/media/pslogo/eth_vlGWKyy.png", Type: "Coin", reserv: 0, currency: "eth"},
    {shortName: "BCH", FullName: "Bitcoin Cash", Icon: "https://sova.gg/media/pslogo/bch_ioiabYE", Type: "Coin", reserv: 0, currency: "bch"},
    {shortName: "ETC", FullName: "Ethereum Classic", Icon: "https://sova.gg/media/pslogo/etc_rOtdr8b.png", Type: "Coin", reserv: 0, currency: "etc"},
    {shortName: "LTC", FullName: "Litecoin", Icon: "https://sova.gg/media/pslogo/litecoin_hhOd3Ke.png", Type: "Coin", reserv: 0, currency: "ltc"},
    {shortName: "XRP", FullName: "Ripple", Icon: "https://sova.gg/media/pslogo/RIPPLE_plqgzto.png", Type: "Coin", reserv: 0, currency: "xrp"},
    {shortName: "XMR", FullName: "Monero", Icon: "https://sova.gg/media/pslogo/XMR_62hInGt.png", Type: "Coin", reserv: 0, currency: "xmr"},
    {shortName: "DOGE", FullName: "Dogecoin", Icon: "https://sova.gg/media/pslogo/dogecoin_F5FF486.svg", Type: "Coin", reserv: 0, currency: "doge"},
    {shortName: "DASH", FullName: "Dash", Icon: "https://sova.gg/media/pslogo/DASH_Fx20TT6.png", Type: "Coin", reserv: 0, currency: "dash"},
    {shortName: "ZEC", FullName: "Zcash", Icon: "https://sova.gg/media/pslogo/Zcash_794dlWY.svg", Type: "Coin", reserv: 0, currency: "zec"},
    {shortName: "TRX", FullName: "Tron", Icon: "https://sova.gg/media/pslogo/tron_icon_Yvymmke.svg", Type: "Coin", reserv: 0, currency: "trx"},
    {shortName: "BNBBEP20", FullName: "Binance Coin BEP20", Icon: "https://sova.gg/media/pslogo/bnb_icon_O2MlPUA.png", Type: "Coin", reserv: 0, currency: "bnb"},
    {shortName: "SOL", FullName: "Solana", Icon: "https://sova.gg/media/pslogo/solana-logo_KoPHo2K.svg", Type: "Coin", reserv: 0, currency: "sol"},
    {shortName: "MATIC", FullName: "Polygon", Icon: "https://sova.gg/media/pslogo/polygon-matic-logo_pRpIhJb.svg", Type: "Coin", reserv: 0, currency: "matic"},
    {shortName: "ATOM", FullName: "Cosmos", Icon: "https://sova.gg/media/pslogo/cosmos_Ugjd0OE.png", Type: "Coin", reserv: 0, currency: "atom"},
    {shortName: "TON", FullName: "TON Coin", Icon: "https://sova.gg/media/pslogo/ton_icon_vJI2ypv.svg", Type: "Coin", reserv: 0, currency: "ton"},
    {shortName: "XLM", FullName: "Stellar", Icon: "https://sova.gg/media/pslogo/stellar_Y8bixsw.svg", Type: "Coin", reserv: 0, currency: "xlm"},
    {shortName: "SHIB", FullName: "Shiba Inu", Icon: "https://sova.gg/media/pslogo/shiba-inu-shib-logo_Mr0OAJe.svg", Type: "Coin", reserv: 0, currency: "shib"},
    {shortName: "CASHRUB", FullName: "Наличные RUB", Icon: "https://sova.gg/media/pslogo/cash_rub_dark_433A5KW.svg", Type: "RUB", reserv: 0, currency: "rub"},
    {shortName: "RVN", FullName: "Ravencoin", Icon: "https://sova.gg/media/pslogo/rvn-icon_5KdERX6.svg", Type: "Coin", reserv: 0, currency: "rvn"},
    {shortName: "CASHTRY", FullName: "Наличные TRY", Icon: "https://sova.gg/media/pslogo/cash_try_dark_VsS3gi6.svg", Type: "Coin", reserv: 0, currency: "try"},
    {shortName: "CASHUSD", FullName: "Наличные USD", Icon: "https://sova.gg/media/pslogo/cash_usd_dark_OeHIqUT.svg", Type: "USD", reserv: 0, currency: "usd"},
    {shortName: "CASHEUR", FullName: "Наличные Москва EUR", Icon: "https://sova.gg/media/pslogo/cash_EUR_simple_lFjCu6u.svg", Type: "EUR", reserv: 0, currency: "eur"},
    {shortName: "CASHAMD", FullName: "Наличные Ереван AMD", Icon: "https://sova.gg/media/pslogo/Armenian_dram_sign_1_RURLbKb.svg", Type: "Coin", reserv: 0, currency: "amd"}
]



const main = async () => {
    for (const val of list) {
        await currency.create({shortName: val.shortName, FullName: val.FullName, Icon: val.Icon, Type: val.Type, reserv: val.reserv, currency: val.currency})
    }
}

(async () => {
    try {
        const text = await main();
        console.log('outside: ' + text);
    } catch (e) {
        // Обработка ошибок
    }
})();