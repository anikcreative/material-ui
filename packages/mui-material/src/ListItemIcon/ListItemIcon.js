import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { unstable_composeClasses as composeClasses } from '@mui/core';
import styled from '../styles/styled';
import useThemeProps from '../styles/useThemeProps';
import { getListItemIconUtilityClass } from './listItemIconClasses';
import ListContext from '../List/ListContext';

const useUtilityClasses = (ownerState) => {
  const { alignItems, classes } = ownerState;

  const slots = {
    root: ['root', alignItems === 'flex-start' && 'alignItemsFlexStart'],
  };

  return composeClasses(slots, getListItemIconUtilityClass, classes);
};

const ListItemIconRoot = styled('div', {
  name: 'MuiListItemIcon',
  slot: 'Root',
  overridesResolver: (props, styles) => {
    const { ownerState } = props;

    return [styles.root, ownerState.alignItems === 'flex-start' && styles.alignItemsFlexStart];
  },
})(({ theme, ownerState }) => ({
  minWidth: 56,
  color: theme.palette.action.active,
  flexShrink: 0,
  display: 'inline-flex',
  ...(ownerState.alignItems === 'flex-start' && {
    marginTop: 8,
  }),
}));

/**
 * A simple wrapper to apply `List` styles to an `Icon` or `SvgIcon`.
 */
const ListItemIcon = React.forwardRef(function ListItemIcon(inProps, ref) {
  const props = useThemeProps({
    props: inProps,
    name: 'MuiListItemIcon',
  });

  const { className, ...other } = props;
  const context = React.useContext(ListContext);
  const ownerState = { ...props, alignItems: context.alignItems };
  const classes = useUtilityClasses(ownerState);

  return (
    <ListItemIconRoot
      className={clsx(classes.root, className)}
      ownerState={ownerState}
      ref={ref}
      {...other}
    />
  );
});

ListItemIcon.propTypes /* remove-proptypes */ = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------
  /**
   * The content of the component, normally `Icon`, `SvgIcon`,
   * or a `@mui/icons-material` SVG icon element.
   */
  children: PropTypes.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: PropTypes.object,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object])),
    PropTypes.func,
    PropTypes.object,
  ]),
};

export default ListItemIcon;
