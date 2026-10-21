import { Fragment, memo } from 'react';
import { StyleSheet, View } from 'react-native';

import type { TIcon } from '@/components';
import { colors, radii } from '@/theme';

import type { SongActionKey } from '../actions';
import { ActionRow } from './ActionRow';

type ActionGroupProps = {
  actions: readonly { key: SongActionKey; label: string; icon: TIcon }[];
  onAction: (key: SongActionKey) => void;
};

// Figma `group`: one rounded card, full-width 1px dividers between rows.
export const ActionGroup = memo(({ actions, onAction }: ActionGroupProps) => (
  <View style={styles.card}>
    {actions.map((action, index) => (
      <Fragment key={action.key}>
        {index > 0 && <View style={styles.divider} />}
        <ActionRow actionKey={action.key} label={action.label} icon={action.icon} onPress={onAction} />
      </Fragment>
    ))}
  </View>
));

ActionGroup.displayName = 'ActionGroup';

const styles = StyleSheet.create({
  card: {
    overflow: 'hidden',
    borderRadius: radii.xl,
    backgroundColor: colors.bg800,
  },
  divider: {
    height: 1,
    backgroundColor: colors.divider,
  },
});
