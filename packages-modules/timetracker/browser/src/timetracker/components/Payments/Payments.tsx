import * as React from 'react';
import { useState } from 'react';
import { useFela } from 'react-fela';
import { EditTwoTone } from '@ant-design/icons';
import { PaymentsModal } from './PaymentsModal';

export const Payments = (props) => {
    const [visible, setVisible] = useState(false);
    const { css } = useFela();

    const openPaymentModal = () => {
        setVisible(true);
    };

    const onClose = () => {
        setVisible(false);
    };

    return (
        <div>
            <PaymentsModal visible={visible} onClose={onClose}/>
            <div className={css(styles.left)}>-</div>
            <EditTwoTone className={css(styles.right)} onClick={openPaymentModal} />
        </div>
    );
};

const styles = {
    left: () => ({
        float: 'left',
    }),
    right: () => ({
        float: 'right', margin: '5px'
    }),
}
