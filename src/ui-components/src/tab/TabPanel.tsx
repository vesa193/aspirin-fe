import { Box } from '@mui/material';
import { TabPanelProps } from './TabPanelTypes';

const TabPanel = ({ children, value, index, ...other }: TabPanelProps) => (
    <div
        role='tabpanel'
        hidden={value !== index}
        id={`aspirin-base-tab-${index}`}
        aria-labelledby={`aspirin-base-tab-${index}`}
        {...other}
    >
        {value === index && (
            <Box sx={{ paddingTop: '36px', position: 'relative' }}>
                <Box>{children}</Box>
            </Box>
        )}
    </div>
);

TabPanel.displayName = 'TabPanel';

export default TabPanel;
