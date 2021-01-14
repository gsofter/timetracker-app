import React, { useState, useRef, useEffect } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { DateRangePicker } from 'react-date-range';
import { enGB, ru, de, it, ua } from 'react-date-range/src/locale';
import { useFela } from 'react-fela';

import { inputRanges, staticRanges } from '../../containers/ReportsPage/ranges';
import { useOutsideClick } from '../../services/hookHelpers';

import { SearchComponent } from '../SearchComponent/index-old';

// import { getTimeEntriesListAction, startSearchMode, endSearchMode } from '../../actions/MainPageAction';

const localeMap = {
  ru: ru,
  en: enGB,
  de: de,
  it: it,
  uk: ua,
};

export interface ITimerSearchComponent {
  vocabulary?: any;
  firstDayOfWeek?: any;
  dateFormat?: any;
  startSearchMode?: any;
  getTimeEntriesListAction?: any;
  endSearchMode?: any;
  isSearchMode?: any;
}

export const TimerSearchComponent: React.FC<ITimerSearchComponent> = ({
  vocabulary,
  firstDayOfWeek,
  dateFormat,
  startSearchMode,
  getTimeEntriesListAction,
  endSearchMode,
  isSearchMode,
}) => {
  const [searchValue, setSearchValue] = useState('');
  const [showCallendar, setShowCallendar] = useState(false);
  const [selectionRange, setSelectionRange] = useState({
    startDate: moment().startOf('month'),
    endDate: moment().endOf('month'),
    key: 'selection',
  });

  // useEffect(() => {
  //     return () => {
  //         endSearchMode();
  //     };
  // }, []);
  // const {
  //     v_today,
  //     v_yesterday,
  //     v_thisWeek,
  //     v_lastWeek,
  //     v_thisMonth,
  //     v_lastMonth,
  //     v_this_year,
  //     v_days_up_to_today,
  //     v_days_starting_today,
  //     lang,
  //     v_reset,
  // } = vocabulary;

  const langData = 'en';

  //   const customLocale = localeMap[lang.short];
  const customLocale = localeMap[langData];
  customLocale.options.weekStartsOn = firstDayOfWeek;

  const wrapperRef = useRef(null);
  useOutsideClick(wrapperRef, () => setShowCallendar(false));

  const handleSearch = async () => {
    startSearchMode({
      searchValue,
      searchDateRange: {
        startDateTime: moment(selectionRange.startDate)
          .utc()
          .toISOString(),
        endDateTime: moment(selectionRange.endDate)
          .add(1, 'day')
          .utc()
          .toISOString(),
      },
    });
    await getTimeEntriesListAction();
  };

  const handleSelect = async (ranges) => {
    setSelectionRange(ranges.selection);
    startSearchMode({
      searchValue,
      searchDateRange: {
        startDateTime: moment(ranges.selection.startDate)
          .utc()
          .toISOString(),
        endDateTime: moment(ranges.selection.endDate)
          .add(1, 'day')
          .utc()
          .toISOString(),
      },
    });
    await getTimeEntriesListAction();
  };

  const handleReset = async () => {
    if (!isSearchMode) {
      return;
    }
    setSearchValue('');
    setSelectionRange({
      startDate: moment().startOf('month'),
      endDate: moment().endOf('month'),
      key: 'selection',
    });
    endSearchMode();
    await getTimeEntriesListAction();
  };
  const { css } = useFela();
  return (
    <div className={css(styleSheet.timerSearchComponentStyle)}>
      <div className="timer-search">
        <div className="timer-search__search-input">
            <p>Search component</p>
          {/* <SearchComponent
            value={searchValue}
            setValue={setSearchValue}
            handleReset={handleReset}
            handleSearch={handleSearch}
          /> */}
        </div>
        <div className="timer-search__date-select" ref={wrapperRef}>
          <div
            className="timer-search__date-select-header"
            onClick={() => setShowCallendar(!showCallendar)}>
            <span>
              01.12.2020
              {/* {moment(selectionRange.startDate).format(dateFormat)} {' - '}
              {moment(selectionRange.endDate).format(dateFormat)} */}
            </span>
            <i className="timer-search__date-select-arrow-down" />
          </div>
          {showCallendar && (
            <div className="timer-search__date-select-body">
              {/* <DateRangePicker
                locale={customLocale}
                dateDisplayFormat={dateFormat}
                ranges={[
                  {
                    startDate: selectionRange.startDate,
                    endDate: selectionRange.endDate,
                    key: 'selection',
                  },
                ]}
                staticRanges={staticRanges({
                  today: 'Today',
                  yesterday: 'Yesterday',
                  thisWeek: 'This week',
                  lastWeek: 'Last week',
                  thisMonth: 'This month',
                  lastMonth: 'Last month',
                  thisYear: 'This year',
                  // firstDayOfWeek,
                },
                  )}
                // inputRanges={inputRanges(v_days_up_to_today, v_days_starting_today, firstDayOfWeek)}
                inputRanges={inputRanges('days until today', 'days starting today', firstDayOfWeek)}
                onChange={handleSelect}
              /> */}
            </div>
          )}
          <button
            className="timer-search__reset-btn"
            onClick={() => handleReset()}>
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

const styleSheet: any = {
  timerSearchComponentStyle: (props) => ({
    position: 'relative',
    // '& .timer-search': {
    //   display: 'flex',
    //   alignItems: 'center',
    // },
    // '& .timer-search__search-input': {
    //   width: '300px',
    //   marginRight: '3rem',
    // },
    // '& .timer-search__date-select': {
    //   position: 'relative',
    //   padding: '6px 0',
    //   display: 'flex',
    //   alignItems: 'center',
    // },
    '@media screen and (max-width: 768px)': {
      '& .timer-search': {
        flexDirection: 'column',
      },
      '& .timer-search__date-select': {
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
      },
      '& .rdrDateRangePickerWrapper': {
        display: 'flex',
        flexWrap: 'wrap-reverse',
      },
      '& .rdrDefinedRangesWrapper': {
        width: '100%',
      },
      '& .rdrStaticRanges': {
        flexWrap: 'wrap',
        flexDirection: 'row',
      },
      '& .rdrStaticRange': {
        width: '50%',
        fontSize: 'inherit',
      },
      '& .rdrInputRanges': {
        display: 'flex',
      },
      '& .rdrStaticRangeLabel': {
        padding: '8px 20px',
      },
      '& .rdrInputRange': {
        padding: '0px 20px',
      },
      '& .timer-search__date-select-arrow-down': {
        marginLeft: 0,
      },
      '& .timer-search__date-select-body': {
        right: '0',
        top: '46px',
        maxHeight: '400px',
        overflow: 'scroll',
      },
      '& .timer-search__reset-btn': {
        padding: '.5rem 2.2rem',
      },
      '& .timer-search__search-input': {
        width: '100%',
        margin: '0',
        background: '#4f4f4f',
        padding: '1rem 1.2rem',
        marginBottom: '1.4rem',
      },
    },
    '& .timer-search__date-select-header': {
      display: 'flex',
      alignItems: 'center',
      fontFamily: '"Open Sans", sans-serif',
      lineHeight: 'normal',
      fontSize: '2rem',
      color: '#ffffff',
      cursor: 'pointer',
      marginRight: '2.5rem',
      whiteSpace: 'nowrap',
    },
    '& .timer-search__date-select-arrow-down': {
      marginLeft: '1rem',
      width: '2.4rem',
      height: '2.4rem',
      background:
        'url("https://time.wobbly.me/static/media/arrow_down.fd79c64d.svg") no-repeat center',
    },
    '& .timer-search__date-select-body': {
      position: 'absolute',
      top: '4rem',
      right: '0',
      zIndex: '7',
      backgroundColor: '#f5f5f5',
      boxShadow: '5px 5px 15px rgba(0,0,0,0.25)',
    },
    '& .timer-search__reset-btn': {
      color: '#ffffff',
      fontSize: '1.4rem',
      lineHeight: '1.9rem',
      background: '#4F4F4F',
      borderRadius: '2px',
      padding: '.5rem 1.2rem',
    },

    '& .rdrDateDisplayItem input': {
      cursor: 'pointer',
      height: '2.5em',
      lineHeight: '2.5em',
      border: '0px',
      background: 'transparent',
      width: '100%',
      color: '#849095',
      textAlign: 'inherit',
    },
    '& .rdrDateDisplayItemActive': {
      borderColor: '#1b8efa',
    },
    '& .rdrDateDisplayItemActive input': {
      color: '#7d888d',
    },
    '& .rdrMonthAndYearPickers select': {
      '-moz-appearance': 'none',
      appearance: 'none',
      '-webkit-appearance': 'none',
      border: 0,
      background: 'transparent',
      padding: '10px 30px 10px 10px',
      borderRadius: '4px',
      outline: '0',
      color: '#3e484f',
      // background: url("data:image/svg+xml,
      // tslint:disable-next-line: max-line-length
      //  utf8,<svg width='9px' height='6px' viewBox='0 0 9 6' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'><g id='Artboard' stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' transform='translate(-636.000000, -171.000000)' fill-opacity='0.368716033'><g id='input' transform='translate(172.000000, 37.000000)' fill='#0E242F' fill-rule='nonzero'><g id='Group-9' transform='translate(323.000000, 127.000000)'><path d='M142.280245,7.23952813 C141.987305,6.92353472 141.512432,6.92361662 141.219585,7.23971106 C140.926739,7.5558055 140.926815,8.06821394 141.219755,8.38420735 L145.498801,13 L149.780245,8.38162071 C150.073185,8.0656273 150.073261,7.55321886 149.780415,7.23712442 C149.487568,6.92102998 149.012695,6.92094808 148.719755,7.23694149 L145.498801,10.7113732 L142.280245,7.23952813 Z' id='arrow'></path></g></g></g></svg>") no-repeat;
      backgroundPosition: 'right 8px center',
      cursor: 'pointer',
      textAlign: 'center',
    },
    '& .rdrMonthAndYearPickers select:hover': {
      backgroundColor: 'rgba(0,0,0,0.07)',
    },
    '& .rdrMonthPicker, .rdrYearPicker': {
      margin: '0 5px',
    },
    '& .rdrNextPrevButton:hover': {
      background: '#E1E7F0',
    },
    '& .rdrNextPrevButton i': {
      display: 'block',
      width: 0,
      height: 0,
      padding: 0,
      textAlign: 'center',
      borderStyle: 'solid',
      margin: 'auto',
      '-webkit-transform': 'translate(-3px,0px)',
      transform: 'translate(-3px,0px)',
    },
    '& .rdrPprevButton i': {
      borderWidth: '4px 6px 4px 4px',
      borderColor: 'transparent #34495e transparent transparent',
      '-webkit-transform': 'translate(-3px,0px)',
      transform: 'translate(-3px,0px)',
    },
    '& .rdrNextButton i': {
      margin: '0 0 0 7px',
      borderWidth: '4px 4px 4px 6px',
      borderColor: 'transparent transparent transparent #34495e',
      '-webkit-transform': 'translate(3px,0px)',
      transform: 'translate(3px,0px)',
    },

    '& .rdrMonth .rdrWeekDays': {
      padding: '0',
    },
    '& .rdrMonths .rdrMonthsVertical .rdrMonth:first-child .rdrMonthName': {
      display: 'none',
    },
    '& .rdrDay:focus': {
      outline: 0,
    },
    '& .rdrDayNumber': {
      outline: 0,
      fontWeight: 300,
      // position: 'absolute',
      left: 0,
      right: 0,
      // top: 0,
      // bottom: 0,
      top: '5px',
      bottom: '5px',
      // display: 'flex',
      '-webkit-box-align': 'center',
      '-ms-flex-align': 'center',
      alignItems: 'center',
      '-webkit-box-pack': 'center',
      '-ms-flex-pack': 'center',
      justifyContent: 'center',
      display: 'block',
      position: 'relative',
    },
    '& .rdrDayToday .rdrDayNumber span': {
      fontWeight: '500',
    },
    '& .rdrDayToday .rdrDayNumber span:after': {
      content: '',
      position: 'absolute',
      bottom: '4px',
      left: '50%',
      '-webkit-transform': 'translate(-50%,0)',
      transform: 'translate(-50%,0)',
      width: '18px',
      height: '2px',
      borderRadius: '2px',
      background: '#3d91ff',
    },
    '& .rdrDayToday .rdrInRange ~ .rdrDayNumber span:after, .rdrDayToday .rdrStartEdge ~ .rdrDayNumber span:after, .rdrDayToday & .rdrEndEdge ~ .rdrDayNumber span:after, .rdrDayToday .rdrSelected ~ .rdrDayNumber span:after': {
      background: '#fff',
    },
    '& .rdrDay:not(.rdrDayPassive) .rdrInRange ~ .rdrDayNumber span, .rdrDay:not(.rdrDayPassive) .rdrStartEdge ~ .rdrDayNumber span, .rdrDay:not(.rdrDayPassive) .rdrEndEdge ~ .rdrDayNumber span .rdrDay:not(.rdrDayPassive) .rdrSelected ~ .rdrDayNumber span': {
      color: 'rgba(255,255,255,0.85)',
    },
    '& .rdrSelected, .rdrInRange, .rdrStartEdge, .rdrEndEdge': {
      background: '#1b8efa',
      position: 'absolute',
      top: '5px',
      left: '0',
      right: '0',
      bottom: '5px',
      pointerEvents: 'none',
    },
    '& .rdrSelected': {
      left: '2px',
      right: '2px',
      borderRadius: '1.042em',
    },
    '& .rdrStartEdge': {
      borderTopLeftRadius: '1.042em',
      borderBottomLeftRadius: '1.042em',
      left: '2px',
    },
    '& .rdrEndEdge': {
      borderTopRightRadius: '1.042em',
      borderBottomRightRadius: '1.042em',
      right: '2px',
    },
    '& .rdrDayStartOfMonth .rdrInRange, .rdrDayStartOfMonth .rdrEndEdge, .rdrDayStartOfWeek .rdrInRange, .rdrDayStartOfWeek .rdrEndEdge': {
      borderTopLeftRadius: '1.042em',
      borderBottomLeftRadius: '1.042em',
      left: '2px',
    },
    '& .rdrDayEndOfMonth .rdrInRange, .rdrDayEndOfMonth .rdrStartEdge, .rdrDayEndOfWeek .rdrInRange, .rdrDayEndOfWeek .rdrStartEdge': {
      borderTopRightRadius: '1.042em',
      borderBottomRightRadius: '1.042em',
      right: '2px',
    },
    '& .rdrDayStartOfMonth .rdrDayInPreview, .rdrDayStartOfMonth .rdrDayEndPreview, .rdrDayStartOfWeek .rdrDayInPreview, .rdrDayStartOfWeek .rdrDayEndPreview': {
      borderTopLeftRadius: '1.333em',
      borderBottomLeftRadius: '1.333em',
      borderLeftWidth: '1px',
      left: '0px',
    },
    '& .rdrDayEndOfMonth .rdrDayInPreview, .rdrDayEndOfMonth .rdrDayStartPreview, .rdrDayEndOfWeek .rdrDayInPreview, .rdrDayEndOfWeek .rdrDayStartPreview': {
      borderTopRightRadius: '1.333em',
      borderBottomRightRadius: '1.333em',
      borderRightWidth: '1px',
      right: '0px',
    },
    '& .rdrDayStartPreview, .rdrDayInPreview, .rdrDayEndPreview': {
      background: 'rgba(255,255,255,0.09)',
      position: 'absolute',
      top: '3px',
      left: '0px',
      right: '0px',
      bottom: '3px',
      pointerEvents: 'none',
      border: '0px solid #1b8efa',
      zIndex: '1',
    },
    '& .rdrDayStartPreview': {
      borderTopWidth: '1px',
      borderLeftWidth: '1px',
      borderBottomWidth: '1px',
      borderTopLeftRadius: '1.333em',
      borderBottomLeftRadius: '1.333em',
      left: '0px',
    },
    '& .rdrDayInPreview': {
      borderTopWidth: '1px',
      borderBottomWidth: '1px',
    },
    '& .rdrDayEndPreview': {
      borderTopWidth: '1px',
      borderRightWidth: '1px',
      borderBottomWidth: '1px',
      borderTopRightRadius: '1.333em',
      borderBottomRightRadius: '1.333em',
      right: '2px',
    },
    '& .rdrDefinedRangesWrapper': {
      fontSize: '12px',
      width: '226px',
      borderRight: 'solid 1px #eff2f7',
      background: '#fff',
    },
    '& .rdrDefinedRangesWrapper .rdrStaticRangeSelected': {
      color: '#1b8efa',
      fontWeight: '600',
    },
    '& .rdrStaticRange': {
      border: 0,
      cursor: 'pointer',
      display: 'block',
      outline: 0,
      borderBottom: '1px solid #eff2f7',
      padding: 0,
      background: '#fff',
    },
    '& .rdrStaticRange:hover .rdrStaticRangeLabel, .rdrStaticRange:focus .rdrStaticRangeLabel': {
      background: '#eff2f7',
    },
    '& .rdrStaticRangeLabel': {
      display: 'block',
      outline: '0',
      lineHeight: '18px',
      padding: '10px 20px',
      textAlign: 'left',
    },
    '& .rdrInputRanges': {
      padding: '10px 0',
    },
    '& .rdrInputRange': {
      '-webkit-box-align': 'center',
      '-ms-flex-align': 'center',
      alignItems: 'center',
      padding: '5px 20px',
      display: 'flex',
    },
    '& .rdrInputRangeInput': {
      width: '30px',
      height: '30px',
      lineHeight: '30px',
      borderRadius: '4px',
      textAlign: 'center',
      border: 'solid 1px #dee7eb',
      marginRight: '10px',
      color: '#6c767a',
    },
    '& .rdrInputRangeInput:focus, .rdrInputRangeInput:hover': {
      borderColor: '#b4bfc4',
      outline: 0,
      color: '#333',
    },
    '& .rdrCalendarWrapper:not(.rdrDateRangeWrapper) .rdrDayHovered .rdrDayNumber:after': {
      content: '',
      border: '1px solid #1b8efa',
      borderRadius: '1.333em',
      position: 'absolute',
      top: '-2px',
      bottom: '-2px',
      left: '0px',
      right: '0px',
      background: 'transparent',
    },
    '& .rdrDayPassive': {
      pointerEvents: 'none',
    },
    '& .rdrDayPassive .rdrDayNumber span': {
      color: '#d5dce0',
    },
    '& .rdrDayPassive .rdrInRange, .rdrDayPassive .rdrStartEdge, .rdrDayPassive .rdrEndEdge, .rdrDayPassive .rdrSelected, .rdrDayPassive .rdrDayStartPreview, .rdrDayPassive .rdrDayInPreview, .rdrDayPassive .rdrDayEndPreview': {
      display: 'none',
    },
    '& .rdrDayDisabled': {
      backgroundColor: '#f8f8f8',
      cursor: 'not-allowed',
    },
    '& .rdrDayDisabled .rdrDayNumber span': {
      color: '#aeb9bf',
    },
    '& .rdrDayDisabled .rdrInRange, .rdrDayDisabled .rdrStartEdge, .rdrDayDisabled .rdrEndEdge, .rdrDayDisabled .rdrSelected, .rdrDayDisabled .rdrDayStartPreview, .rdrDayDisabled .rdrDayInPreview, .rdrDayDisabled .rdrDayEndPreview': {
      '-webkit-filter': 'grayscale(100%) opacity(60%)',
      filter: 'grayscale(100%) opacity(60%)',
    },
    '& .rdrMonthName': {
      textAlign: 'left',
      fontWeight: '600',
      color: '#849095',
      padding: '0.833em',
    },

    '& .rdrCalendarWrapper': {
      '-webkit-box-sizing': 'border-box',
      boxSizing: 'border-box',
      background: '#ffffff',
      display: 'inline-flex',
      '-webkit-box-orient': 'vertical',
      '-webkit-box-direction': 'normal',
      msFlexDirection: 'column',
      flexDirection: 'column',
      webkitUserSelect: 'none',
      mozUserSelect: 'none',
      msUserSelect: 'none',
      userSelect: 'none',
      color: '#000000',
      fontSize: '12px',
      width: '100%',
    },
    '& .rdrDateDisplay': {
      display: 'flex',
      justifyContent: 'space-between',
      '-webkitBoxPack': 'justify',
      '-ms-flex-pack': 'justify',
      backgroundColor: '#eff2f7',
      padding: '0.833em',
    },
    '& .rdrDateDisplayItem': {
      '-webkit-box-flex': '1',
      '-ms-flex': '1 1',
      flex: '1 1',
      width: '0',
      textAlign: 'center',
      color: 'inherit',
      borderRadius: '4px',
      backgroundColor: '#ffffff',
      '-webkit-box-shadow': '0 1px 2px 0 rgba(35,57,66,0.21)',
      boxShadow: '0 1px 2px 0 rgba(35,57,66,0.21)',
      border: '1px solid transparent',
    },
    '& .rdrDateDisplayItem + .rdrDateDisplayItem': {
      marginLeft: '0.833em',
    },
    '& .rdrDateDisplayItem input:disabled': {
      cursor: 'default',
    },
    '& .rdrMonthAndYearWrapper': {
      '-webkit-box-sizing': 'inherit',
      boxSizing: 'inherit',
      display: 'flex',
      '-webkit-box-pack': 'justify',
      '-ms-flex-pack': 'justify',
      justifyContent: 'space-between',
      '-webkit-box-align': 'center',
      '-ms-flex-align': 'center',
      alignItems: 'center',
      height: '60px',
      paddingTop: '10px',
    },
    '& .rdrMonthAndYearPickers': {
      '-webkit-box-flex': '1',
      '-ms-flex': '1 1 auto',
      flex: '1 1 auto',
      display: 'flex',
      '-webkit-box-pack': 'center',
      '-ms-flex-pack': 'center',
      justifyContent: 'center',
      '-webkit-box-align': 'center',
      '-ms-flex-align': 'center',
      alignItems: 'center',
    },
    '& .rdrNextPrevButton': {
      '-webkit-box-sizing': 'inherit',
      boxSizing: 'inherit',
      cursor: 'pointer',
      outline: 'none',
      display: 'block',
      width: '24px',
      height: '24px',
      margin: '0 0.833em',
      padding: '0',
      border: '0',
      borderRadius: '5px',
      background: '#EFF2F7',
    },
    '& .rdrMonths': {
      display: 'flex',
    },
    '& .rdrMonthsVertical': {
      '-webkit-box-orient': 'vertical',
      '-webkit-box-direction': 'normal',
      '-ms-flex-direction': 'column',
      flexDirection: 'column',
    },
    '& .rdrMonthsHorizontal > div > div > div': {
      display: 'flex',
      '-webkit-box-orient': 'horizontal',
      '-webkit-box-direction': 'normal',
      '-ms-flex-direction': 'row',
      flexDirection: 'row',
    },
    '& .rdrMonth': {
      width: '27.667em',
      padding: '0 0.833em 1.666em 0.833em',
      paddingBottom: '0',
    },
    '& .rdrWeekDays': {
      display: 'flex',
      padding: '0 0.833em',
    },
    '& .rdrWeekDay': {
      '-ms-flex-preferred-size': 'calc(14.285714285714%)',
      flexBasis: 'calc(14.285714285714%)',
      '-webkit-box-sizing': 'inherit',
      boxSizing: 'inherit',
      textAlign: 'center',
      fontWeight: '400',
      lineHeight: '2.667em',
      color: '#849095',
    },
    '& .rdrDays': {
      display: 'flex',
      '-ms-flex-wrap': 'wrap',
      flexWrap: 'wrap',
    },
    '& .rdrInfiniteMonths': {
      overflow: 'auto',
    },
    '& .rdrDateRangeWrapper': {
      '-webkit-user-select': 'none',
      '-moz-user-select': 'none',
      '-ms-user-select': 'none',
      userSelect: 'none',
    },
    '& .rdrDay': {
      '-webkit-box-sizing': 'inherit',
      boxSizing: 'inherit',
      width: 'calc(14.285714285714%)',
      position: 'relative',
      font: 'inherit',
      cursor: 'pointer',
      background: 'transparent',
      '-webkit-user-select': 'none',
      '-moz-user-select': 'none',
      '-ms-user-select': 'none',
      userSelect: 'none',
      border: 0,
      padding: 0,
      lineHeight: '3.000em',
      height: '3.000em',
      textAlign: 'center',
      color: '#1d2429',
    },
    '& .rdrDayNumber span': {
      color: '#1d2429',
    },
    '& .rdrDateRangePickerWrapper': {
      display: 'inline-flex',
      '-webkit-user-select': 'none',
      '-moz-user-select': 'none',
      '-ms-user-select': 'none',
      userSelect: 'none',
    },
    '& .rdrStaticRanges': {
      display: 'flex',
      '-webkit-box-orient': 'vertical',
      '-webkit-box-direction': 'normal',
      '-ms-flex-direction': 'column',
      flexDirection: 'column',
    },
    '& .rdrDateDisplayItem+.rdrDateDisplayItem': {
      marginLeft: '.833em',
    },
  }),
};
