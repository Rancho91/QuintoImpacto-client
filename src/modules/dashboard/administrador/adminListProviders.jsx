import { Box, Tab, Tabs, Typography, useTheme } from "@mui/material";
import styles from "./adminListProviders.module.css";
import { useEffect, useState } from "react";
import useGetAll from "../../../utils/services/hooks/useGetAll";
import dataButtonsAdmin from "../../../utils/data/dataButtonsAdmin";
import CustomTabPanel from "../../../components/TabPanel";
import useUser from "../../../utils/services/hooks/useUser";
import ProvidersList from "../ProvidersList";

const allyProps = (index) => {
  return {
    id: `tab-${index}`,
    "aria-controls": `tabpanel-${index}`,
  };
};

export default function AdminListProviders() {
  const [url, setUrl] = useState(null)
  const [value, setValue] = useState(0)
  const [providers, setProviders] = useState([]);
  const { token } = useUser();
  const theme = useTheme();

  const handleChange = (evt, newValue) => {
    setValue(newValue);
  };

  const { data } = useGetAll({
    url: url || 'supplier/allNews',
    needsAuth: true,
    token: token,
  })

  useEffect(() => {
    if (data?.data?.length >= 0) {
      setProviders(data?.data);
    }
  }, [url, data])


  return (
    <div className={styles.container}>
      <section className={styles.titleContainer} >
        <Typography variant='titulos'>
          Proveedores
        </Typography>
      </section>
      <section className={styles.tabsContainer}>
        <Box className={styles.adminBoxTabs}>
          <Tabs
            id='admin-providers-tabs'
            className={styles.adminTabsNav}
            value={value}
            onChange={handleChange}
            aria-label="admin-providers-tabs"
            variant="scrollable"
            TabIndicatorProps={{
              style: {
                backgroundColor: theme.palette.violeta.main
              }
            }}
          >
            {dataButtonsAdmin.map((button) => (
              <Tab key={button.id} label={button.title} onClick={() => setUrl(button.url)} className={styles.adminTab} {...allyProps(button.id)} sx={{
                color: "#505050",
                fontFamily: theme.typography.fontFamily,
                textTransform: "none",
                fontSize: "16px",
                '&.Mui-selected': {
                  fontWeight: 700
                }
              }} />
            ))}
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0} className={styles.adminTabpanel}>
          <ProvidersList providers={providers} />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1} className={styles.adminTabpanel}>
          <ProvidersList providers={providers} />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={2} className={styles.adminTabpanel}>
          <ProvidersList providers={providers} />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={3} className={styles.adminTabpanel}>
          <ProvidersList providers={providers} />
        </CustomTabPanel>
      </section>
    </div>
  )
}
