import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import {ConfigProvider} from 'antd'
import './index.scss'
import './ant-styles.scss'
import 'antd/dist/reset.css';
import AppLayout from './components/app-layout/AppLayout.tsx'

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <ConfigProvider>
            <AppLayout/>
        </ConfigProvider>
    </StrictMode>,
)
