import { Avatar, List } from 'antd';
import React from 'react';
import classNames from 'classnames';
import { NoticeIconData } from './index';
import { useFela } from "react-fela";

export interface NoticeIconTabProps {
  count?: number;
  name?: string;
  showClear?: boolean;
  showViewMore?: boolean;
  style?: React.CSSProperties;
  title: string;
  tabKey: string;
  data?: NoticeIconData[];
  onClick?: (item: NoticeIconData) => void;
  onClear?: () => void;
  emptyText?: string;
  clearText?: string;
  viewMoreText?: string;
  list: NoticeIconData[];
  onViewMore?: (e: any) => void;
}
const NoticeList: React.SFC<NoticeIconTabProps> = ({
  data = [],
  onClick,
  onClear,
  title,
  onViewMore,
  emptyText,
  showClear = true,
  clearText,
  viewMoreText,
  showViewMore = false,
}) => {
  const { css, theme } = useFela();
  if (!data || data.length === 0) {
    return (
      <div>
        <div className={'notFound'}>
          <img
            src="https://gw.alipayobjects.com/zos/rmsportal/sAuJeJzSKbUmHfBQRzmZ.svg"
            alt="not found"
          />
          <div>{emptyText}</div>
        </div>
      </div>
    );
  }
  return (
    <div className={css(styleSheet.heaaderStyles)}>
      <List<NoticeIconData>
        className={'list'}
        dataSource={data}
        renderItem={(item, i) => {
          const itemCls = 
          classNames('item', {
            ['read']: 'read',
          });
          // eslint-disable-next-line no-nested-ternary
          const leftIcon = item.avatar ? (
            typeof item.avatar === 'string' ? (
              <Avatar className={'avatar'} src={item.avatar} />
            ) : (
              <span className={'iconElement'}>{item.avatar}</span>
            )
          ) : null;

          return (
            <List.Item
              className={itemCls}
              key={item.key || i}
              onClick={() => onClick && onClick(item)}
            >
              <List.Item.Meta
                className={'meta'}
                avatar={leftIcon}
                title={
                  <div className={'title'}>
                    {item.title}
                    <div
                      className={'extra'}
                    >{item.extra}</div>
                  </div>
                }
                description={
                  <div>
                    <div className={'description'}>{item.description}</div>
                    <div className={'datetime'}>{item.datetime}</div>
                  </div>
                }
              />
            </List.Item>
          );
        }}
      />
      <div className={'bottomBar'}>
        {showClear ? (
          <div onClick={onClear}>
            {clearText} {title}
          </div>
        ) : null}
        {showViewMore ? (
          <div
            onClick={(e) => {
              if (onViewMore) {
                onViewMore(e);
              }
            }}
          >
            {viewMoreText}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default NoticeList;

const styleSheet: any = {
  heaaderStyles: ({theme, layout}) => ({
    "& .list": {
      'maxHeight': '400px',
      'overflow': 'auto',
      '&::-webkit-scrollbar': {
        'display': 'none'
      },
      '& .item': {
        'padding-right': '24px',
        'padding-left': '24px',
        'overflow': 'hidden',
        'cursor': 'pointer',
        'transition': 'all 0.3s',
        
        '& .meta': {
          'width': '100%'
        },
        '& .avatar': {
          'margin-top': '4px',
          'background': '@component-background'
        },
        '& .iconElement': {
          'font-size': '32px'
        },
        '& .read': {
          'opacity': '0.4'
        },
        '&:last-child': {
          'border-bottom': '0'
        },
        '&:hover': {
          'background': '@primary-1'
        },
        '& .title': {
         'margin-bottom': '8px',
          'font-weight': 'normal'
        },
        '& .description': {
          'font-size': '12px',
          'line-height': '@line-height-base'
        },
        '& .datetime': {
          'margin-top': '4px',
          'font-size': '12px',
          'line-height': '@line-height-base'
        },
        '& .extra': {
          'float': 'right',
          'margin-top': '-1.5px',
          'margin-right': '0',
          'color': '@text-color-secondary',
          'font-weight': 'normal'
        }
      },
      '& .loadMore': {
        'padding': '8px 0',
        'color': '@primary-6',
        'text-align': 'center',
        'cursor': 'pointer',
        '&.loadedAll': {
          'color': 'rgba(0, 0, 0, 0.25)',
          'cursor': 'unset'
        }
      }
    },
    '& .notFound': {
      'padding': '73px 0 88px',
      'color': '@text-color-secondary',
      'text-align': 'center',
      'img': {
        'display': 'inline-block',
        'height': '76px',
        'margin-bottom': '16px'
      }
    },
    '& .bottomBar': {
      'height': '46px',
      'color': '@text-color',
      'line-height': '46px',
      'text-align': 'center',
      'border-top': '1px solid @border-color-split',
      'border-radius': '0 0 @border-radius-base @border-radius-base',
      'transition': 'all 0.3s',
      'div': {
        'display': 'inline-block',
        'width': '50%',
        'cursor': 'pointer',
        'transition': 'all 0.3s',
        'user-select': 'none',
        '&:only-child': {
          'width': '100%'
        },
        '&:not(:only-child):last-child': {
          'border-left': '1px solid @border-color-split'
        }
      }
    }
  })
};
