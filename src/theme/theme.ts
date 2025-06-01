import type {ThemeConfig} from "antd/es/config-provider/context";

export const theme: ThemeConfig = {
    token: {
        colorPrimary: '#E84D4B',
        marginLG: 12
    },
    components: {
        Button: {
            colorPrimary: '#E84D4B',
            algorithm: true,
            colorTextDisabled: 'beige',
            colorBgContainerDisabled: 'darkgray',
        },
        Input: {
            colorPrimary: '#E84D4B',
            algorithm: true,
        },
        Form: {
            labelColor: 'beige',
            verticalLabelPadding: 0,
        },
    },
}