import React from 'react'
import { Layout as LayoutUI, Nav } from 'fantasy-ui-react'
import { Map } from 'fantasy-map'

const { Navbar, BrandLink, NavItem } = Nav
const { LayoutNLC } = LayoutUI
const navbarHeight = 63
const styles = {
    navbar: {
        height: '63px',
        paddingTop: '5px',
    },
}
const brandLink = (<BrandLink to="/">Fantasy Layers</BrandLink>)
const left = [
    <NavItem key="0" to="/introduction">INTRODUCTION</NavItem>,
    <NavItem key="2" to="/documentation">DOCUMENTATION</NavItem>,
    <NavItem key="3" to="/examples">EXAMPLES</NavItem>,
]
const navbar = (<Navbar style={styles.navbar} brand={brandLink} left={left} fluid={true}/>)
const map = (<Map/>)
class Layout extends React.Component {
    render() {
        return (
            <LayoutNLC navbarHeight={navbarHeight}
                navbar={navbar}
                leftbar={<div >leftbar</div>}
                center={map}
            />
        )
    }
}
export default Layout
