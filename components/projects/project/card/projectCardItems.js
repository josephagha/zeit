import { useState, useEffect, Fragment } from "react";
import Loding from "../../../sharing/loding";
import styles from "./projectCardItems.module.scss";
import ProjectCardItem from "./projectCardItem";

const ProjectCardItems = ({ data } = props) => {
  const [loading, setLoading] = useState(true);
  const [itemsGroup, setItemsGroup] = useState();

  useEffect(() => {
    let itemsContener = [];

    for (let i = 0; i < data.length; i += 5) {
      const chunk = data.slice(i, i + 5);
      itemsContener.push(chunk);
    }

    setItemsGroup(itemsContener);
    setLoading(false);
     // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) return <Loding/>;

  return (
    <Fragment>
      <div className={styles.tabs}>
        {itemsGroup.map((items, index) => (
          <div className={styles.tabContainer} key={index}>
            {items.map((item, index) => (
              <ProjectCardItem data={item} key={index} />
            ))}
          </div>
        ))}
      </div>
    </Fragment>
  );
};

export default ProjectCardItems;
